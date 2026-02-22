import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


console.log("🔥 CORS FIX VERSION DEPLOYED");
const PORT = process.env.PORT || 5000;
const app = express();

/* ================= BODY PARSERS ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= CORS (FIXED) ================= */
app.use(
  cors({
    origin: [
      "https://reborne-h1o5.vercel.app/",
      "https://reborne-gf4p.vercel.app", // ✅ your Vercel frontend
      "http://localhost:5173",           // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// handle preflight
app.options("*", cors());

/* ================= DB ================= */
connectDB();

/* ================= ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Reborne backend is running" });
});

/* ================= ERRORS ================= */
app.use(notFound);
app.use(errorHandler);

/* ================= START ================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});