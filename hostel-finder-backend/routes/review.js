const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authenticate, requireRole } = require("../middleware/authMiddleware");

/**
 * REVIEW ROUTES
 * Students can create reviews
 * Anyone can view reviews
 */

// POST /reviews - Create new review (students only)
router.post("/", authenticate, requireRole("student"), reviewController.createReview);

// GET /reviews/hostel/:hostelId - Get all reviews for a hostel
router.get("/hostel/:hostelId", reviewController.getReviewsByHostel);

// GET /reviews/student/:studentId - Get all reviews by a student
router.get("/student/:studentId", reviewController.getReviewsByStudent);

// PUT /reviews/:id - Update a review (students only, own reviews)
router.put("/:id", authenticate, requireRole("student"), reviewController.updateReview);

// DELETE /reviews/:id - Delete a review (students only, own reviews)
router.delete("/:id", authenticate, requireRole("student"), reviewController.deleteReview);

module.exports = router;



