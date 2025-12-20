import express from "express";
import{
    createReview,
    getReviewsByBook,
    updateReview,
    deleteReview,
}from "../controllers/reviewController.js";

const router = express.Router();

router.post("/",createReview);

router.get("/:bookId",getReviewsByBook);

router.put("/:reviewId",updateReview);

router.delete("/:reviewId",deleteReview);

export default router;