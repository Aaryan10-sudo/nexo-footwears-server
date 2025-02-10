import { Cart } from "../schema/cartSchema.js";

export const addCartController = async (req, res, next) => {
  try {
   const {userId , productId, quantity} = req.body;

    const result = await Cart.create(data);
    res.status(201).json({
      success: true,
      message: "Items added to cart successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSpecificUserCart = async (req, res, next) => {
  const userId = req.body;
  try {
    const result = await Cart.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: result,
    });
  } catch (error) {}
};

export const deleteCart = async (req, res, next) => {
  const cartId = req.body;
  try {
    const result = await Cart.findByIdAndDelete(cartId);
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
