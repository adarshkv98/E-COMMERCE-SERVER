import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();



router.post("/", addToCart);
router.get("/:userId", getCart);
router.put("/", updateCart);
router.delete("/", removeFromCart);
router.delete("/clear", clearCart);

export default router;

