const mysql = require("mysql2/promise");

// Railway MySQL configuration (NO FALLBACKS)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Initialize tables ONLY (no DB creation)
async function initializeDatabase() {
    const connection = await pool.getConnection();
    try {
        // USERS
        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student','owner','admin') NOT NULL,
        contact_number VARCHAR(20)
      )
    `);

        // HOSTELS
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

        // REVIEWS
        await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rating INT NOT NULL,
        comment TEXT,
        hostel_id INT NOT NULL,
        student_id INT NOT NULL,
        FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // BOOKINGS
        await connection.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT NOT NULL,
        student_id INT NOT NULL,
        status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
        FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // ENQUIRIES
        await connection.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hostel_id INT NOT NULL,
        student_id INT NOT NULL,
        type ENUM('enquiry','schedule_visit') NOT NULL,
        message TEXT,
        scheduled_date DATETIME,
        reply TEXT,
        status ENUM('pending','responded') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        replied_at TIMESTAMP NULL,
        FOREIGN KEY (hostel_id) REFERENCES hostels(id) ON DELETE CASCADE,
        FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

        // SEED ONLY ONCE
        const [[{ count }]] = await connection.query(
            "SELECT COUNT(*) AS count FROM users"
        );

        if (count === 0) {
            await connection.query(
                "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
                ["Admin", "admin.pk@example.com", "admin123", "admin"]
            );
        }

        console.log("✅ Database initialized on Railway");
    } catch (err) {
        console.error("❌ DB init failed:", err);
        throw err;
    } finally {
        connection.release();
    }
}

// Init immediately
initializeDatabase().catch(() => process.exit(1));

module.exports = pool;
