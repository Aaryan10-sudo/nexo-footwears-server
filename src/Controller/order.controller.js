import Order from "../schema/orderSchema.js";

export const createOrder = async (req, res) => {
  try {
    const data = req.body;

    const order = await Order.create(data);

    res.status(201).json({
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({
      message: "Orders fetched successfully.",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getSpecificOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json({
      message: "Order fetched successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Order updated successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Order deleted successfully.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
