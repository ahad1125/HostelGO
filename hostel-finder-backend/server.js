const express = require("express");
const cors = require("cors");

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
// CORS configuration for production (Vercel) and development
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // In development, allow all origins
        if (process.env.NODE_ENV !== "production") {
            return callback(null, true);
        }
        
        // In production, allow Vercel domains and custom frontend URL
        const allowedPatterns = [
            /^https:\/\/.*\.vercel\.app$/,
            process.env.FRONTEND_URL,
        ].filter(Boolean);
        
        const isAllowed = allowedPatterns.some(pattern => {
            if (pattern instanceof RegExp) {
                return pattern.test(origin);
            }
            return origin === pattern;
        });
        
        if (isAllowed || !origin) {
            callback(null, true);
        } else {
            // For now, allow all in production too (can restrict later)
            callback(null, true);
        }
    },
    credentials: true,
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
// Wait for database to be ready before starting
// =====================
const PORT = process.env.PORT || 5000;

// Import database and wait for initialization
const db = require("./config/database");

// Wait for database to be ready before starting server
db.ready
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📡 API available at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start server - database not ready");
        process.exit(1);
    });
