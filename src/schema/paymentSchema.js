import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, unique: true },

    pidx: { type: String, unique: true },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchasedItem",
      required: true,
    },

    amount: { type: Number, required: true },

    dataFromVerificationReq: { type: Object },

    apiQueryFromUser: { type: Object },

    paymentStatus: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    method: {
      type: String,
      enum: ["cod", "esewa", "khalti"],
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
