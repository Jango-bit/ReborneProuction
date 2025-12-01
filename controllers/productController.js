import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";

// GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 20;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.search ? { name: { $regex: req.query.search, $options: "i" } } : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) return res.json(product);
  res.status(404);
  throw new Error("Product not found");
});

// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
});

// PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
});


const deleteProduct = asyncHandler(async (req, res) => {
  const deleted = await Product.findByIdAndDelete(req.params.id);
  if (deleted) {
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
