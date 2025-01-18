import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },

    user_info: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      shippingAddress: {
        type: String,
        required: true,
      },
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
    },

    price: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "khalti", "esewa"],
      default: "COD",
    },

    deliveryStatus: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
