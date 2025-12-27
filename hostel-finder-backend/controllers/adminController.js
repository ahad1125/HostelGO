const db = require("../config/database"); // Use direct database queries for reliability

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
        console.log("🔍 Admin: Fetching all hostels");
        
        // Direct query - reliable and fast
        const [rows] = await db.query(
            `SELECT h.*, u.name as owner_name, u.email as owner_email,
                    COALESCE(u.contact_number, '') as owner_contact_number
             FROM hostels h
             JOIN users u ON h.owner_id = u.id
             ORDER BY h.id DESC`
        );
        
        console.log("✅ Admin: Found", rows.length, "hostels");
        res.json(Array.isArray(rows) ? rows : []);
    } catch (err) {
        console.error("❌ Error in admin getAllHostels:", err.message);
        console.error("Error code:", err.code);
        console.error("Error SQL state:", err.sqlState);
        return res.status(500).json({ 
            error: "Database error", 
            details: err.message,
            code: err.code,
            sqlState: err.sqlState
        });
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
        console.log("🔍 Admin: Verifying hostel:", hostelId);
        
        // Check if hostel exists using direct query
        const [hostelRows] = await db.query(
            `SELECT h.*, u.name as owner_name, u.email as owner_email,
                    COALESCE(u.contact_number, '') as owner_contact_number
             FROM hostels h
             JOIN users u ON h.owner_id = u.id
             WHERE h.id = ?`,
            [parseInt(hostelId)]
        );

        if (!hostelRows || hostelRows.length === 0) {
            console.log("❌ Hostel not found:", hostelId);
            return res.status(404).json({ error: "Hostel not found" });
        }

        const hostel = hostelRows[0];

        if (hostel.is_verified === 1) {
            console.log("⚠️ Hostel already verified");
            return res.status(400).json({ error: "Hostel is already verified" });
        }

        // Update verification status using direct query
        await db.query(
            "UPDATE hostels SET is_verified = 1 WHERE id = ?",
            [parseInt(hostelId)]
        );

        // Fetch updated hostel
        const [updatedRows] = await db.query(
            `SELECT h.*, u.name as owner_name, u.email as owner_email,
                    COALESCE(u.contact_number, '') as owner_contact_number
             FROM hostels h
             JOIN users u ON h.owner_id = u.id
             WHERE h.id = ?`,
            [parseInt(hostelId)]
        );

        console.log("✅ Hostel verified successfully");
        res.json({
            message: "Hostel verified successfully",
            hostel: updatedRows[0]
        });
    } catch (err) {
        console.error("❌ Error in verifyHostel:", err.message);
        console.error("Error code:", err.code);
        console.error("Error SQL state:", err.sqlState);
        return res.status(500).json({ 
            error: "Failed to verify hostel", 
            details: err.message,
            code: err.code,
            sqlState: err.sqlState
        });
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
        console.log("🔍 Admin: Unverifying/rejecting hostel:", hostelId);
        
        // Check if hostel exists using direct query
        const [hostelRows] = await db.query(
            `SELECT h.*, u.name as owner_name, u.email as owner_email,
                    COALESCE(u.contact_number, '') as owner_contact_number
             FROM hostels h
             JOIN users u ON h.owner_id = u.id
             WHERE h.id = ?`,
            [parseInt(hostelId)]
        );

        if (!hostelRows || hostelRows.length === 0) {
            console.log("❌ Hostel not found:", hostelId);
            return res.status(404).json({ error: "Hostel not found" });
        }

        const hostel = hostelRows[0];

        // If hostel is pending (is_verified = 0), delete it completely
        // If hostel is verified (is_verified = 1), just unverify it
        if (hostel.is_verified === 0) {
            // Delete the hostel (cascade will handle related records)
            await db.query("DELETE FROM hostels WHERE id = ?", [parseInt(hostelId)]);
            console.log("✅ Hostel deleted (rejected)");
            res.json({
                message: "Hostel rejected and removed successfully",
                deleted: true
            });
        } else {
            // Just unverify verified hostels
            await db.query(
                "UPDATE hostels SET is_verified = 0 WHERE id = ?",
                [parseInt(hostelId)]
            );
            
            // Fetch updated hostel
            const [updatedRows] = await db.query(
                `SELECT h.*, u.name as owner_name, u.email as owner_email,
                        COALESCE(u.contact_number, '') as owner_contact_number
                 FROM hostels h
                 JOIN users u ON h.owner_id = u.id
                 WHERE h.id = ?`,
                [parseInt(hostelId)]
            );

            console.log("✅ Hostel unverified successfully");
            res.json({
                message: "Hostel unverified successfully",
                hostel: updatedRows[0],
                deleted: false
            });
        }
    } catch (err) {
        console.error("❌ Error in unverifyHostel:", err.message);
        console.error("Error code:", err.code);
        console.error("Error SQL state:", err.sqlState);
        return res.status(500).json({ 
            error: "Failed to reject hostel", 
            details: err.message,
            code: err.code,
            sqlState: err.sqlState
        });
    }
};

/**
 * Get platform statistics
 * GET /admin/statistics
 * Returns aggregated platform statistics
 */
const getPlatformStats = async (req, res) => {
    try {
        console.log("🔍 Admin: Fetching platform statistics");
        
        // Get average rating and total reviews
        const [reviewStats] = await db.query(
            `SELECT 
                AVG(rating) as avg_rating,
                COUNT(*) as total_reviews
             FROM reviews`
        );
        
        // Get average rent
        const [rentStats] = await db.query(
            `SELECT AVG(rent) as avg_rent FROM hostels WHERE is_verified = 1`
        );
        
        // Get unique cities count
        const [cityStats] = await db.query(
            `SELECT COUNT(DISTINCT city) as total_cities FROM hostels WHERE is_verified = 1`
        );
        
        // Get total bookings (confirmed)
        const [bookingStats] = await db.query(
            `SELECT COUNT(*) as total_bookings FROM bookings WHERE status = 'confirmed'`
        );
        
        const stats = {
            avg_rating: reviewStats[0]?.avg_rating ? parseFloat(reviewStats[0].avg_rating).toFixed(1) : "0.0",
            total_reviews: reviewStats[0]?.total_reviews || 0,
            avg_rent: rentStats[0]?.avg_rent ? Math.round(rentStats[0].avg_rent) : 0,
            total_cities: cityStats[0]?.total_cities || 0,
            total_bookings: bookingStats[0]?.total_bookings || 0
        };
        
        console.log("✅ Admin: Platform statistics:", stats);
        res.json(stats);
    } catch (err) {
        console.error("❌ Error in getPlatformStats:", err.message);
        console.error("Error code:", err.code);
        console.error("Error SQL state:", err.sqlState);
        return res.status(500).json({ 
            error: "Database error", 
            details: err.message,
            code: err.code,
            sqlState: err.sqlState
        });
    }
};

/**
 * Get all bookings (admin view)
 * GET /admin/bookings
 * Returns all bookings with student and hostel details
 */
const getAllBookings = async (req, res) => {
    try {
        console.log("🔍 Admin: Fetching all bookings");
        
        // Get all bookings with student and hostel details
        const [rows] = await db.query(
            `SELECT 
                b.*,
                h.name as hostel_name,
                h.address as hostel_address,
                h.city as hostel_city,
                h.rent as hostel_rent,
                u_student.name as student_name,
                u_student.email as student_email,
                COALESCE(u_student.contact_number, '') as student_contact_number,
                u_owner.name as owner_name,
                u_owner.email as owner_email
             FROM bookings b
             JOIN hostels h ON b.hostel_id = h.id
             JOIN users u_student ON b.student_id = u_student.id
             JOIN users u_owner ON h.owner_id = u_owner.id
             ORDER BY b.id DESC`
        );
        
        console.log("✅ Admin: Found", rows.length, "bookings");
        res.json(Array.isArray(rows) ? rows : []);
    } catch (err) {
        console.error("❌ Error in getAllBookings:", err.message);
        console.error("Error code:", err.code);
        console.error("Error SQL state:", err.sqlState);
        return res.status(500).json({ 
            error: "Database error", 
            details: err.message,
            code: err.code,
            sqlState: err.sqlState
        });
    }
};

module.exports = {
    getAllHostels,
    verifyHostel,
    unverifyHostel,
    getPlatformStats,
    getAllBookings
};
