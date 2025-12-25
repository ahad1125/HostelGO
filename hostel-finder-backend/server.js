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

// =====================
// Middleware
// =====================
app.use(cors({
    origin: "*", // OK for now; restrict later when frontend is live
}));
app.use(express.json());

// =====================
// Health / Root Route
// =====================
app.get("/", (req, res) => {
    res.json({
        message: "Hostel Finder Backend API",
        status: "Running",
        endpoints: {
            auth: "/auth/signup, /auth/login",
            hostels: "/hostels, /hostels/search, /hostels/:id",
            admin: "/admin/hostels, /admin/verify-hostel/:id, /admin/unverify-hostel/:id",
            reviews: "/reviews, /reviews/hostel/:hostelId",
            enquiries: "/enquiries, /enquiries/hostel/:id",
        },
    });
});

// =====================
// Routes
// =====================
app.use("/auth", authRoutes);
app.use("/hostels", hostelRoutes);
app.use("/admin", adminRoutes);
app.use("/reviews", reviewRoutes);
app.use("/enquiries", enquiryRoutes);

// =====================
// 404 Handler
// =====================
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// =====================
// Error Handler
// =====================
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: "Something went wrong",
        details: err.message,
    });
});

// =====================
// Start Server (Railway-safe)
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
