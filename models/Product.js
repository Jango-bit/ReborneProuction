import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String, default: "" }
});

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  brand: { type: String },
  category: { type: String },
  price: { type: Number, required: true, default: 0 },
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  images: [imageSchema],
  colors: [String],
  sizes: [String]
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
