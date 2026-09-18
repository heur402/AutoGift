import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";
import notificationRoutes from "./routes/notification.js";
import orderRoutes from "./routes/order.js";
import productRoutes from "./routes/product.js";
import revenueRoutes from "./routes/revenue.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({ message: "AutoGift API is running" });
});
app.use("/api/products", productRoutes);
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

if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error(`Unable to start server: ${error.message}`);
    process.exitCode = 1;
  });
}

export { app, startServer };
export default app;
