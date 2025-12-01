// backend/scripts/seedProducts.js
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

const sampleProducts = [
  {
    name: "Reborne Classic Tee",
    slug: "reborn-classic-tee",
    description: "Comfortable cotton tee",
    brand: "Reborne",
    category: "Clothing",
    price: 499,
    countInStock: 25,
    images: [{ url: "/images/sample1.jpg", alt: "Classic tee" }],
    colors: ["black", "white"],
    sizes: ["S", "M", "L"]
  },
  {
    name: "Reborne Runner Sneaker",
    slug: "reborn-runner-sneaker",
    description: "Stylish running sneaker",
    brand: "Reborne",
    category: "Footwear",
    price: 2499,
    countInStock: 10,
    images: [{ url: "/images/sample2.jpg", alt: "Runner sneaker" }],
    colors: ["grey", "blue"],
    sizes: ["8", "9", "10"]
  }
];

const importData = async () => {
  try {
    await connectDB();

    // wipe existing data
    await Product.deleteMany();
    await User.deleteMany();

    // create admin user (password will be hashed by the model)
    await User.create({
      name: "Admin",
      email: "admin@reborne.local",
      password: "admin123",
      isAdmin: true
    });

    // insert sample  
    await Product.insertMany(sampleProducts);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

importData();
