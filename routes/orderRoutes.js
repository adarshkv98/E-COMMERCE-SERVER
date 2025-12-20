import express from "express";
import {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();


router.get("/:userId",getUserOrders);
router.get("/single/:orderId",getOrderById);
router.put ("/:orderId",updateOrderStatus);
router.delete("/orderId",deleteOrder);

export default router;