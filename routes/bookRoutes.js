import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBoook,
} from "../controllers/bookController.js";

const router = express.Router();

// CREATE BOOK (Admin + Image Upload)
router.post(
    "/",
    requireSignIn,
    isAdmin,
    upload.single("image"),
    createBook
);

// GET ALL BOOKS (Public)
router.get("/", getAllBooks);

// GET SINGLE BOOK (Public)
router.get("/:id", getSingleBook);

// UPDATE BOOK (Admin + Optional Image Upload)
router.put(
    "/:id",
    requireSignIn,
    isAdmin,
    upload.single("image"),
    updateBook
);

// DELETE BOOK (Admin)
router.delete(
    "/:id",
    requireSignIn,
    isAdmin,
    deleteBoook
);

export default router;
