import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = Router();

// GET /api/products - list products with optional filters and sorting.
router.get("/", listProducts);
// GET /api/products/:id - fetch one product.
router.get("/:id", getProduct);
// POST /api/products - create a product.
router.post("/", createProduct);
// PUT /api/products/:id - update a product.
router.put("/:id", updateProduct);
// DELETE /api/products/:id - remove a product.
router.delete("/:id", deleteProduct);

export default router;
