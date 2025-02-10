import { pool } from "../db/connectPostgresdb.js";
import { Product } from "../schema/productSchema.js";

export const createProduct = async (req, res) => {
  try {
    const data = req.body;

    const query = `
      INSERT INTO products (name, price, brand, category, product_description, stock, size, color, image) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *;
    `;

    const values = [
      data.name,
      data.price,
      data.brand,
      data.category,
      data.product_description,
      data.stock,
      data.size,
      data.color,
      data.image,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: "Product Created Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.status(200).json({
      message: "Products fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res
      .status(200)
      .json({ message: "Product found successfully.", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully.", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    res
      .status(200)
      .json({ message: "Product deleted successfully.", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
