import {
  initializeKhaltiPayment,
  verifyKhaltiController,
} from "../utils/khalti.js";

export const initializePaymentController = async (req, res, next) => {
  try {
    const { itemId, itemName, quantity, price, website_url } = req.body;
    const totalPrice = Number(price) * Number(quantity);

    const itemData = await itemId.find({
      _id: itemId,
      name: itemName,
    });

    if (!itemData.length) {
      throw new Error("Item not found");
    }

    const purchasedData = await PurchasedItem.create({
      itemId: itemId,
      itemName: itemName,
      price: price,
      quantity: quantity,
      totalPrice: totalPrice,
    });

    const paymentInitiate = await initializeKhaltiPayment({
      purchase_order_id: purchasedData._id,
      purchase_order_name: itemName,
      amount: totalPrice * 100,
      return_url: `${process.env.BACKEND_URI}/complete-khalti-payment`,
      website_url,
    });
    res.status(200).json({
      message: "Purchase successful",
      paymentInitiate: paymentInitiate,
      purchasedData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const completePaymentController = async (req, res, next) => {
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
    const paymentInfo = await verifyKhaltiController;
    if (
      paymentInfo?.status !== "Completed" ||
      paymentInfo?.transaction_id !== transaction_id ||
      Number(paymentInfo.total_amount) !== Number(amount)
    ) {
      return res.status(400).json({ message: "Payment Failed" });
    }

    const purchasedItem = await PurchasedItem.find({
      _id: purchase_order_id,
      itemName: purchase_order_name,
      totalPrice: Number(amount),
    });
    if (!purchasedItem) {
      return res.status(400).json({ message: "Purchased Item not found" });
    }
    await PurchasedItem.findByIdAndUpdate(
      purchase_order_id,
      { paymentStatus: "Completed" },
      { new: true }
    );

    const createPayment = await Payment.create({
      transactionId: transaction_id,
      pidx: pidx,
      productId: purchase_order_id,
      amount: Number(amount),
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      status: "completed",
    });
    res.status(200).json({
      message: "Payment successful",
      paymentData: createPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
