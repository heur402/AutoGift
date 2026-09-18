import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

// GET /api/products - list products, optionally filtered by search or category.
router.get("/", listProducts);
// GET /api/products/:id - fetch one product.
router.get("/:id", getProduct);
// POST /api/products - create a product.
router.post("/", createProduct);
// PUT /api/products/:id - update a product.
router.put("/:id", updateProduct);
router.patch("/:id", updateProduct);
// DELETE /api/products/:id - remove a product.
router.delete("/:id", deleteProduct);

export default router;
