import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

// POST /api/orders
const addOrder = asyncHandler(async (req, res) => {
  const { orderItems } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }
  const order = new Order(req.body);
  const created = await order.save();
  res.status(201).json(created);
});

// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) return res.json(order);
  res.status(404);
  throw new Error("Order not found");
});

// PUT /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = Date.now();
  const updated = await order.save();
  res.json(updated);
});

// GET /api/orders (admin)
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json(orders);
});

export { addOrder, getOrderById, updateOrderToPaid, getOrders };
