import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "../lib/khalti/khalti.js";
import Order from "../schema/orderSchema.js";

import Payment from "../schema/paymentSchema.js";
import { sendMail } from "../utils/sendMail.js";

export async function initializeKhaltiPaymentController(req, res, next) {
  try {
    const orderId = req.query.orderId;

    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "processing", paymentMethod: "khalti" },
      { new: true }
    );

    const paymentInitiate = await initializeKhaltiPayment({
      purchase_order_id: orderId,
      purchase_order_name: updateOrder.productName,
      amount: updateOrder.totalPrice * 100,
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`,
      website_url: `${process.env.BACKEND_URI}`,
    });
    res.status(200).json({
      message: "Purchase successful",
      paymentInitiate: paymentInitiate,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to initiate Khalti payment",
      error: error.message,
    });
  }
}

export async function completeKhaltiPaymentController(req, res, next) {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  try {
    const paymentInfo = await verifyKhaltiPayment(pidx);
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({ message: "Payment failed" });
    }

    const orderedItem = await Order.findById({
      _id: purchase_order_id,
      itemName: purchase_order_name,
      totalPrice: Number(amount),
    });
    if (!orderedItem) {
      return res.status(404).json({ message: "Purchased item not found" });
    }
    await Order.findByIdAndUpdate(
      purchase_order_id,
      { paymentStatus: "Completed" },
      { new: true }
    );

    const createPayment = await Payment.create({
      transactionId: transaction_id,
      pidx: pidx,
      productId: purchase_order_id,
      amount: Number(amount) / 100,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      method: "khalti",
      paymentStatus: "completed",
    });
    res.status(200).json({
      message: "Payment successful",
      paymentData: createPayment,
    });
    await sendMail({
      to: `lazyfox916@gmail.com`,
      subject: "Payment Completed",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Payment Completed</h1>
        <p>Dear Admin,</p>
        <p>We are pleased to inform you that a payment has been successfully completed for the following order:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 10px; border: 1px solid #ddd;">Detail</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Value</th>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Transaction ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${transaction_id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">PIDX</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${pidx}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Order ID</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${purchase_order_id}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Order Name</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${purchase_order_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Amount</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${
              Number(amount) / 100
            } NPR</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Mobile</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${mobile}</td>
          </tr>
           <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Payment Method</td>
            <td style="padding: 10px; border: 1px solid #ddd;">Khalti</td>
          </tr>
        </table>
        <p>Thank you for your prompt action.</p>
        <p style="color: #555;">Regards,</p>
        <p style="font-weight: bold;">Aaryan Sharma</p>
      </div>
      `,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
