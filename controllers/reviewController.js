import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";


// ============================
// CREATE REVIEW
// POST /api/reviews
// ============================
export const createReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;

    if (!userId || !bookId || !rating) {
      return res.status(400).json({
        message: "userId, bookId and rating are required",
      });
    }

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ user: userId, book: bookId });
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this book",
      });
    }

    const review = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};


// ============================
// GET REVIEWS OF A BOOK
// GET /api/reviews/:bookId
// ============================
export const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name email");

    res.status(200).json({
      message: reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get reviews",
      error: error.message,
    });
  }
};


// ============================
// UPDATE REVIEW
// PUT /api/reviews/:reviewId
// ============================
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await review.save();

    res.status(200).json({
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update review",
      error: error.message,
    });
  }
};


// ============================
// DELETE REVIEW
// DELETE /api/reviews/:reviewId
// ============================
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
