import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import revenueRoutes from "./routes/revenueRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";

dotenv.config();
const app = express();

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  },
  credentials: false,
}));
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => {
    console.log(`AutoGift API listening on port ${port}`);
  });
};

startServer();

export { app, startServer };
export default app;
