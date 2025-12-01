import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }
}, { _id: false });

const orderSchema = mongoose.Schema({
  orderItems: [orderItemSchema],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: { type: Boolean, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, default: false },
  deliveredAt: Date
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
