const express = require("express");
const router = express.Router();
const hostelController = require("../controllers/hostelController");
const { authenticate, requireRole } = require("../middleware/authMiddleware");

/**
 * HOSTEL ROUTES
 * Most routes require authentication
 * Different access based on user role
 */

// GET /hostels/public - Public endpoint for verified hostels (no auth required)
// Used by landing page carousel
// MUST be before /:id route to avoid route conflict
router.get("/public", hostelController.getPublicHostels);

// GET /hostels/search - Search and filter hostels
// Query params: city, maxRent, facility
// MUST be before /:id route to avoid route conflict
router.get("/search", authenticate, hostelController.searchHostels);

// GET /hostels - Get all hostels (role-based filtering)
// Students: only verified, Owners: only their own, Admins: all
router.get("/", authenticate, hostelController.getAllHostels);

// GET /hostels/:id - Get single hostel by ID
// MUST be last to avoid matching /public or /search
router.get("/:id", authenticate, hostelController.getHostelById);

// POST /hostels - Create new hostel (owners only)
router.post("/", authenticate, requireRole("owner"), hostelController.createHostel);

// PUT /hostels/:id - Update hostel (owners only, their own hostels)
router.put("/:id", authenticate, requireRole("owner"), hostelController.updateHostel);

// DELETE /hostels/:id - Delete hostel (owners only, their own hostels)
router.delete("/:id", authenticate, requireRole("owner"), hostelController.deleteHostel);

module.exports = router;



