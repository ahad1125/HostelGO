const express = require("express");
const cors = require("cors");
const db = require("./config/database");

// Import route modules
const authRoutes = require("./routes/auth");
const hostelRoutes = require("./routes/hostel");
const adminRoutes = require("./routes/admin");
const reviewRoutes = require("./routes/review");
const enquiryRoutes = require("./routes/enquiry");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Root route - Health check
app.get("/", (req, res) => {
    res.json({ 
        message: "Hostel Finder Backend API",
        status: "Running",
        endpoints: {
            auth: "/auth/signup, /auth/login",
            hostels: "/hostels, /hostels/search, /hostels/:id",
            admin: "/admin/hostels, /admin/verify-hostel/:id, /admin/unverify-hostel/:id",
            reviews: "/reviews, /reviews/hostel/:hostelId, /reviews/student/:studentId, /reviews/:id (PUT/DELETE)",
            enquiries: "/enquiries, /enquiries/hostel/:id, /enquiries/owner, /enquiries/student, /enquiries/:id/reply (PUT)"
        }
    });
});

// Route handlers
app.use("/auth", authRoutes); // Authentication routes (public)
app.use("/hostels", hostelRoutes); // Hostel routes (authenticated, role-based)
app.use("/admin", adminRoutes); // Admin routes (admin only)
app.use("/reviews", reviewRoutes); // Review routes (students create, anyone view)
app.use("/enquiries", enquiryRoutes); // Enquiry routes (students create, owners view)

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!", details: err.message });
});

// Start server after database is ready
const PORT = process.env.PORT || 5000;

// Wait for database initialization before starting server
if (db.ready) {
    db.ready.then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}`);
        });
    }).catch((err) => {
        console.error("Failed to start server - database not ready:", err);
        process.exit(1);
    });
} else {
    // Fallback: wait 3 seconds if ready promise not available
    setTimeout(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}`);
        });
    }, 3000);
}
