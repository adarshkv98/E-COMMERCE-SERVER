import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

import { requireSignIn, isAdmin } from "../Middleware/authMiddleware.js"

const router = express.Router();

// PUBLIC ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

// PROTECTED ROUTES
router.post("/logout", requireSignIn, logoutUser);

// ADMIN ONLY
router.get("/", requireSignIn, isAdmin, getAllUsers);

// USER / ADMIN
router.get("/:id", requireSignIn, getUserById);
router.put("/:id", requireSignIn, updateUser);

// ADMIN ONLY
router.delete("/:id", requireSignIn, isAdmin, deleteUser);

export default router;
