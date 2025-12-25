const Enquiry = require("../models/Enquiry");
const Hostel = require("../models/Hostel");

/**
 * ENQUIRY CONTROLLER
 * Handles student enquiries and scheduled visits
 */

/**
 * Create a new enquiry
 * POST /enquiries
 * Body: { hostel_id, type, message, scheduled_date }
 * Only students can create enquiries
 */
const createEnquiry = async (req, res) => {
    const user = req.user;
    const { hostel_id, type, message, scheduled_date } = req.body;

    // Validate required fields
    if (!hostel_id || !type) {
        return res.status(400).json({ 
            error: "hostel_id and type are required" 
        });
    }

    // Validate type
    if (!['enquiry', 'schedule_visit'].includes(type)) {
        return res.status(400).json({ 
            error: "Type must be 'enquiry' or 'schedule_visit'" 
        });
    }

    // For schedule_visit, scheduled_date is required
    if (type === 'schedule_visit' && !scheduled_date) {
        return res.status(400).json({ 
            error: "scheduled_date is required for schedule_visit" 
        });
    }

    try {
        // Check if hostel exists
        const hostel = await Hostel.findById(parseInt(hostel_id));

        if (!hostel) {
            return res.status(404).json({ error: "Hostel not found" });
        }

        // Students can only enquire about verified hostels
        if (user.role === 'student' && hostel.is_verified !== 1) {
            return res.status(403).json({ error: "You can only enquire about verified hostels" });
        }

        // Create new enquiry
        const enquiry = await Enquiry.create({
            hostel_id: parseInt(hostel_id),
            student_id: user.id,
            type,
            message: message || null,
            scheduled_date: scheduled_date || null
        });

        res.status(201).json({
            message: type === 'schedule_visit' ? "Visit scheduled successfully" : "Enquiry sent successfully",
            enquiry
        });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create enquiry", details: err.message });
    }
};

/**
 * Get enquiries for a hostel (owner view)
 * GET /enquiries/hostel/:hostelId
 * Only owners can view enquiries for their own hostels
 */
const getEnquiriesByHostel = async (req, res) => {
    const user = req.user;
    const hostelId = req.params.hostelId || req.params.id;

    try {
        // Check if hostel exists and belongs to user
        const hostel = await Hostel.findById(parseInt(hostelId));

        if (!hostel) {
            return res.status(404).json({ error: "Hostel not found" });
        }

        // Only owners can view enquiries for their hostels
        if (user.role !== 'owner' || hostel.owner_id !== user.id) {
            return res.status(403).json({ error: "You can only view enquiries for your own hostels" });
        }

        // Get enquiries with student names
        const enquiries = await Enquiry.findByHostel(parseInt(hostelId));
        res.json(enquiries);
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
};

/**
 * Get all enquiries for owner's hostels
 * GET /enquiries/owner
 * Returns all enquiries across all hostels owned by the user
 */
const getEnquiriesByOwner = async (req, res) => {
    const user = req.user;

    try {
        // Only owners can access this endpoint
        if (user.role !== 'owner') {
            return res.status(403).json({ error: "Only owners can view enquiries" });
        }

        // Get all enquiries for owner's hostels
        const enquiries = await Enquiry.findByOwner(user.id);
        res.json(enquiries);
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
};

/**
 * Reply to an enquiry
 * PUT /enquiries/:id/reply
 * Body: { reply }
 * Only owners can reply to enquiries for their hostels
 */
const replyToEnquiry = async (req, res) => {
    const user = req.user;
    const enquiryId = req.params.id;
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
        return res.status(400).json({ error: "Reply message is required" });
    }

    try {
        // Check if enquiry exists and get hostel info
        const enquiry = await Enquiry.findById(parseInt(enquiryId));

        if (!enquiry) {
            return res.status(404).json({ error: "Enquiry not found" });
        }

        // Get hostel to check ownership
        const hostel = await Hostel.findById(enquiry.hostel_id);

        // Only owners can reply to enquiries for their hostels
        if (user.role !== 'owner' || hostel.owner_id !== user.id) {
            return res.status(403).json({ error: "You can only reply to enquiries for your own hostels" });
        }

        // Update enquiry with reply
        const updatedEnquiry = await Enquiry.updateById(parseInt(enquiryId), {
            reply: reply.trim(),
            status: 'responded'
        });

        res.json({
            message: "Reply sent successfully",
            enquiry: updatedEnquiry
        });
    } catch (err) {
        return res.status(500).json({ error: "Failed to send reply", details: err.message });
    }
};

/**
 * Get enquiries by student
 * GET /enquiries/student
 * Returns all enquiries sent by the logged-in student
 */
const getEnquiriesByStudent = async (req, res) => {
    const user = req.user;

    try {
        // Only students can access this endpoint
        if (user.role !== 'student') {
            return res.status(403).json({ error: "Only students can view their enquiries" });
        }

        // Get all enquiries sent by the student
        const enquiries = await Enquiry.findByStudent(user.id);
        res.json(enquiries);
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
};

module.exports = {
    createEnquiry,
    getEnquiriesByHostel,
    getEnquiriesByOwner,
    replyToEnquiry,
    getEnquiriesByStudent
};

