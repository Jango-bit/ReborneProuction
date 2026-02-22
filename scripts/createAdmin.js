import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    await connectDB();

    // check if admin already exists
    const adminExists = await User.findOne({
      email: "admin@reborne.local",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "Admin",
      email: "admin@reborne.local",
      password: "admin123", 
      isAdmin: true,
    });

    console.log("Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error("Admin creation failed:", error);
    process.exit(1);
  }
};

createAdmin();