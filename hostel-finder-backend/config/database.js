const mysql = require("mysql2/promise");

// MySQL database configuration
// You can set these via environment variables or update directly
const dbName = process.env.DB_NAME || "hostel_finder";
// Get password - use environment variable if set, otherwise use hardcoded value
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : "3333";
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: dbPassword,
    database: dbName,  // Will be created if it doesn't exist
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create connection pool
// Note: Pool will connect lazily, so database can be created during initialization
const pool = mysql.createPool(dbConfig);

// Initialize all database tables
async function initializeDatabase() {
    let connection;
    try {
        // First, create a connection without database to create it
        // Explicitly pass password to ensure it's used
        const tempConnection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbPassword  // Use the same password variable
        });
        
        // Create database if it doesn't exist
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        await tempConnection.end();
        
        // Now get connection from pool (with database)
        connection = await pool.getConnection();

        // Users table: stores all user accounts (students, owners, admins)
        // role can be: 'student', 'owner', 'admin'
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role ENUM('student', 'owner', 'admin') NOT NULL
            )
        `);

        // Add contact_number column if it doesn't exist
        try {
            const [columns] = await connection.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'users' 
                AND COLUMN_NAME = 'contact_number'
            `);
            if (columns.length === 0) {
                await connection.query(`
                    ALTER TABLE users 
                    ADD COLUMN contact_number VARCHAR(20) DEFAULT NULL
                `);
            }
        } catch (err) {
            console.warn('Could not add contact_number column to users:', err.message);
        }

        // Hostels table: stores hostel listings
        // is_verified: 0 = unverified, 1 = verified (only verified hostels visible to students)
        // owner_id: foreign key to users table (the hostel owner)
        await connection.query(`
            CREATE TABLE IF NOT EXISTS hostels (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                city VARCHAR(255) NOT NULL,
                rent INT NOT NULL,
                facilities TEXT,
                owner_id INT NOT NULL,
                contact_number VARCHAR(20),
                is_verified TINYINT(1) DEFAULT 0,
                FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        
        // Add contact_number column if it doesn't exist (for existing databases)
        try {
            const [columns] = await connection.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'hostels' 
                AND COLUMN_NAME = 'contact_number'
            `);
            if (columns.length === 0) {
                await connection.query(`
                    ALTER TABLE hostels 
                    ADD COLUMN contact_number VARCHAR(20)
                `);
            }
        } catch (err) {
            console.warn('Could not add contact_number column:', err.message);
        }

        // Reviews table: stores student reviews for hostels
        // rating: typically 1-5 stars
        // student_id: foreign key to users table (the student who wrote the review)
        // hostel_id: foreign key to hostels table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rating INT NOT NULL CHECK(rating >= 1 AND rating <= 5),
                comment TEXT,
                hostel_id INT NOT NULL,
                student_id INT NOT NULL,
                FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
                FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Bookings table: stores booking records
        // status: can be 'pending', 'confirmed', 'cancelled'
        // student_id: foreign key to users table (the student who made the booking)
        // hostel_id: foreign key to hostels table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hostel_id INT NOT NULL,
                student_id INT NOT NULL,
                status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
                FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
                FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // Enquiries table: stores student enquiries and scheduled visits
        // type: 'enquiry', 'schedule_visit'
        // message: enquiry message or visit date/time
        // reply: owner's reply message
        await connection.query(`
            CREATE TABLE IF NOT EXISTS enquiries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                hostel_id INT NOT NULL,
                student_id INT NOT NULL,
                type ENUM('enquiry', 'schedule_visit') NOT NULL,
                message TEXT,
                scheduled_date DATETIME,
                reply TEXT,
                status ENUM('pending', 'responded') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                replied_at TIMESTAMP NULL,
                FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
                FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
        
        // Add reply and replied_at columns if they don't exist (for existing databases)
        try {
            const [columns] = await connection.query(`
                SELECT COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_SCHEMA = DATABASE() 
                AND TABLE_NAME = 'enquiries' 
                AND COLUMN_NAME IN ('reply', 'replied_at')
            `);
            const existingColumns = columns.map(c => c.COLUMN_NAME);
            
            if (!existingColumns.includes('reply')) {
                await connection.query(`
                    ALTER TABLE enquiries 
                    ADD COLUMN reply TEXT
                `);
            }
            if (!existingColumns.includes('replied_at')) {
                await connection.query(`
                    ALTER TABLE enquiries 
                    ADD COLUMN replied_at TIMESTAMP NULL
                `);
            }
        } catch (err) {
            console.warn('Could not add reply columns:', err.message);
        }

        // Seed initial data (Pakistani hostels) if database is empty
        const [userRows] = await connection.query("SELECT COUNT(*) as count FROM users");
        const userCount = userRows[0].count;

        // Only seed when there are no users yet (fresh database)
        if (userCount === 0) {
            console.log("Seeding initial users and hostels data...");

            // Create some owner accounts for Pakistani hostels
            const owners = [
                { name: "Ali Khan", email: "ali.owner@example.com", password: "password123", role: "owner", contact_number: "0300-1234567" },
                { name: "Sara Ahmed", email: "sara.owner@example.com", password: "password123", role: "owner", contact_number: "0301-2345678" },
                { name: "Usman Malik", email: "usman.owner@example.com", password: "password123", role: "owner", contact_number: "0302-3456789" }
            ];

            const admin = { name: "Admin", email: "admin.pk@example.com", password: "admin123", role: "admin" };
            const student = { name: "ahad", email: "ahad@gmail.com", password: "1234", role: "student" };

            // Insert users
            for (const owner of owners) {
                await connection.query(
                    "INSERT INTO users (name, email, password, role, contact_number) VALUES (?, ?, ?, ?, ?)",
                    [owner.name, owner.email, owner.password, owner.role, owner.contact_number]
                );
            }
            await connection.query(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                [admin.name, admin.email, admin.password, admin.role]
            );
            await connection.query(
                "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                [student.name, student.email, student.password, student.role]
            );

            // Check if hostels table is empty before seeding hostels
            const [hostelRows] = await connection.query("SELECT COUNT(*) as count FROM hostels");
            const hostelCount = hostelRows[0].count;

            if (hostelCount === 0) {
                // Fetch owner IDs by email so foreign keys are valid
                const [ownerRows] = await connection.query(
                    "SELECT id, email FROM users WHERE email IN (?, ?, ?)",
                    ["ali.owner@example.com", "sara.owner@example.com", "usman.owner@example.com"]
                );

                const getOwnerId = (email) => {
                    const row = ownerRows.find((r) => r.email === email);
                    return row ? row.id : null;
                };

                const seedHostels = [
                    {
                        name: "Gulberg Boys Hostel",
                        address: "Near Liberty Market, Gulberg III, Lahore, Punjab, Pakistan",
                        city: "Lahore",
                        rent: 15000,
                        facilities: "Wifi, AC, Laundry, Mess, 24/7 Security",
                        ownerEmail: "ali.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "Johar Town Student Hostel",
                        address: "Block R1, Johar Town, Lahore, Punjab, Pakistan",
                        city: "Lahore",
                        rent: 12000,
                        facilities: "Wifi, Mess, Study Room, CCTV",
                        ownerEmail: "ali.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "DHA Girls Hostel",
                        address: "Phase 5, DHA, Lahore, Punjab, Pakistan",
                        city: "Lahore",
                        rent: 18000,
                        facilities: "Wifi, AC, Mess, Generator Backup, Laundry",
                        ownerEmail: "sara.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "G-10 Student Hostel",
                        address: "Street 43, Sector G-10/2, Islamabad, Pakistan",
                        city: "Islamabad",
                        rent: 14000,
                        facilities: "Wifi, Mess, Hot Water, UPS Backup",
                        ownerEmail: "usman.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "Blue Area Boys Hostel",
                        address: "Near Jinnah Avenue, Blue Area, Islamabad, Pakistan",
                        city: "Islamabad",
                        rent: 16000,
                        facilities: "Wifi, AC, Mess, Parking, 24/7 Security",
                        ownerEmail: "usman.owner@example.com",
                        is_verified: 0
                    },
                    {
                        name: "University Road Hostel",
                        address: "Near NIPA Chowrangi, University Road, Karachi, Sindh, Pakistan",
                        city: "Karachi",
                        rent: 13000,
                        facilities: "Wifi, Mess, Laundry, CCTV",
                        ownerEmail: "sara.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "PECHS Girls Hostel",
                        address: "Block 6, PECHS, Karachi, Sindh, Pakistan",
                        city: "Karachi",
                        rent: 17000,
                        facilities: "Wifi, AC, Mess, Generator Backup, Housekeeping",
                        ownerEmail: "sara.owner@example.com",
                        is_verified: 1
                    },
                    {
                        name: "Saddar Student Lodge",
                        address: "Near Mall Road, Saddar, Rawalpindi, Punjab, Pakistan",
                        city: "Rawalpindi",
                        rent: 11000,
                        facilities: "Wifi, Mess, Study Room, CCTV",
                        ownerEmail: "ali.owner@example.com",
                        is_verified: 0
                    }
                ];

                for (const h of seedHostels) {
                    const ownerId = getOwnerId(h.ownerEmail);
                    if (!ownerId) {
                        console.error("Missing owner for hostel:", h.name, "ownerEmail:", h.ownerEmail);
                        continue;
                    }
                    // Generate a contact number for each hostel (format: 03XX-XXXXXXX)
                    const contactNumbers = [
                        "0300-1234567", "0301-2345678", "0302-3456789", "0303-4567890",
                        "0304-5678901", "0305-6789012", "0306-7890123", "0307-8901234"
                    ];
                    const contactNumber = contactNumbers[seedHostels.indexOf(h) % contactNumbers.length];
                    
                    await connection.query(
                        "INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                        [h.name, h.address, h.city, h.rent, h.facilities, ownerId, contactNumber, h.is_verified]
                    );
                }

                console.log("Seeded Pakistani hostel data successfully.");
            }
        }

        console.log("Database initialized successfully!");
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

// Track initialization status
let isInitialized = false;
let initPromise = null;

// Initialize database on module load
initPromise = initializeDatabase()
    .then(() => {
        isInitialized = true;
        console.log("Database ready for queries");
    })
    .catch((err) => {
        console.error("Failed to initialize database:", err);
        process.exit(1);
    });

// Export pool for use in other modules
// The pool will handle connections even if initialization is still in progress
module.exports = pool;

// Export initialization promise for modules that need to wait
module.exports.ready = initPromise;
module.exports.isReady = () => isInitialized;

