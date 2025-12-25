const Hostel = require("../models/hostel");

/**
 * ADMIN CONTROLLER
 * Handles admin-only operations
 * Only users with role 'admin' can access these endpoints
 */

/**
 * Get all hostels (verified and unverified)
 * GET /admin/hostels
 * Admin can see all hostels regardless of verification status
 */
const getAllHostels = async (req, res) => {
    try {
        const hostels = await Hostel.findAll();
        res.json(hostels);
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
};

/**
 * Verify a hostel
 * PUT /admin/verify-hostel/:id
 * Sets is_verified = 1, making it visible to students
 */
const verifyHostel = async (req, res) => {
    const hostelId = req.params.id;

    try {
        // Check if hostel exists
        const hostel = await Hostel.findById(parseInt(hostelId));

        if (!hostel) {
            return res.status(404).json({ error: "Hostel not found" });
        }

        if (hostel.is_verified === 1) {
            return res.status(400).json({ error: "Hostel is already verified" });
        }

        // Update verification status
        const updatedHostel = await Hostel.setVerificationStatus(parseInt(hostelId), 1);

        res.json({
            message: "Hostel verified successfully",
            hostel: updatedHostel
        });
    } catch (err) {
        return res.status(500).json({ error: "Failed to verify hostel", details: err.message });
    }
};

/**
 * Unverify/Reject a hostel
 * PUT /admin/unverify-hostel/:id
 * Deletes the hostel when rejected (removes it from verification dashboard)
 * For verified hostels, this will unverify them instead of deleting
 */
const unverifyHostel = async (req, res) => {
    const hostelId = req.params.id;

    try {
        // Check if hostel exists
        const hostel = await Hostel.findById(parseInt(hostelId));

        if (!hostel) {
            return res.status(404).json({ error: "Hostel not found" });
        }

        // If hostel is pending (is_verified = 0), delete it completely
        // If hostel is verified (is_verified = 1), just unverify it
        if (hostel.is_verified === 0) {
            // Delete the hostel (cascade will handle related records)
            await Hostel.deleteById(parseInt(hostelId));

            res.json({
                message: "Hostel rejected and removed successfully",
                deleted: true
            });
        } else {
            // Just unverify verified hostels
            const updatedHostel = await Hostel.setVerificationStatus(parseInt(hostelId), 0);

            res.json({
                message: "Hostel unverified successfully",
                hostel: updatedHostel,
                deleted: false
            });
        }
    } catch (err) {
        console.error("Error rejecting hostel:", err);
        return res.status(500).json({ error: "Failed to reject hostel", details: err.message });
    }
};

module.exports = {
    getAllHostels,
    verifyHostel,
    unverifyHostel
};
