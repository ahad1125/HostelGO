const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");
const { authenticate, requireRole } = require("../middleware/authMiddleware");

/**
 * ENQUIRY ROUTES
 * Students can create enquiries
 * Owners can view enquiries for their hostels
 */

// POST /enquiries - Create new enquiry (students only)
router.post("/", authenticate, requireRole("student"), enquiryController.createEnquiry);

// GET /enquiries/owner - Get all enquiries for owner's hostels (owner only)
// This must come before /hostel/:hostelId to avoid route conflicts
router.get("/owner", authenticate, requireRole("owner"), enquiryController.getEnquiriesByOwner);

// GET /enquiries/student - Get all enquiries sent by student (student only)
router.get("/student", authenticate, requireRole("student"), enquiryController.getEnquiriesByStudent);

// GET /enquiries/hostel/:hostelId - Get enquiries for a hostel (owner only)
router.get("/hostel/:hostelId", authenticate, requireRole("owner"), enquiryController.getEnquiriesByHostel);

// PUT /enquiries/:id/reply - Reply to an enquiry (owner only)
router.put("/:id/reply", authenticate, requireRole("owner"), enquiryController.replyToEnquiry);

module.exports = router;

