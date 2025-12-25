-- Sample Data for HostelGo Database
-- Run this after tables are created to populate with test data

-- ============================================
-- USERS TABLE
-- ============================================
-- Note: Passwords are plain text for this prototype (admin123, student123, owner123)

-- Admin user (already created by initialization, but adding here for reference)
-- INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin.pk@example.com', 'admin123', 'admin');

-- Student users
INSERT INTO users (name, email, password, role, contact_number) VALUES
('Ahmed Ali', 'ahmed.ali@student.com', 'student123', 'student', '0300-1234567'),
('Fatima Khan', 'fatima.khan@student.com', 'student123', 'student', '0300-2345678'),
('Hassan Raza', 'hassan.raza@student.com', 'student123', 'student', '0300-3456789'),
('Ayesha Malik', 'ayesha.malik@student.com', 'student123', 'student', '0300-4567890');

-- Owner users
INSERT INTO users (name, email, password, role, contact_number) VALUES
('Muhammad Asif', 'asif.hostel@owner.com', 'owner123', 'owner', '0300-1111111'),
('Zainab Sheikh', 'zainab.hostel@owner.com', 'owner123', 'owner', '0300-2222222'),
('Bilal Ahmed', 'bilal.hostel@owner.com', 'owner123', 'owner', '0300-3333333');

-- ============================================
-- HOSTELS TABLE
-- ============================================
-- Note: owner_id references users.id
-- is_verified: 0 = pending, 1 = verified
-- Using email to find owner IDs (more reliable than assuming IDs)

-- Hostels by Muhammad Asif (asif.hostel@owner.com)
INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Gulberg Boys Hostel', '123 Main Boulevard, Gulberg III', 'Lahore', 15000, 'WiFi, Parking, Food, Laundry, AC', (SELECT id FROM users WHERE email = 'asif.hostel@owner.com'), '0300-1111111', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Model Town Hostel', '456 Model Town Road', 'Lahore', 12000, 'WiFi, Parking, Food', (SELECT id FROM users WHERE email = 'asif.hostel@owner.com'), '0300-1111111', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'DHA Phase 5 Hostel', '789 DHA Phase 5, Block A', 'Lahore', 18000, 'WiFi, Parking, Food, Laundry, AC, Gym', (SELECT id FROM users WHERE email = 'asif.hostel@owner.com'), '0300-1111111', 0;

-- Hostels by Zainab Sheikh (zainab.hostel@owner.com)
INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Karachi University Hostel', '12 University Road, Near KU', 'Karachi', 14000, 'WiFi, Food, Laundry', (SELECT id FROM users WHERE email = 'zainab.hostel@owner.com'), '0300-2222222', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Clifton Boys Hostel', '34 Clifton Block 2', 'Karachi', 16000, 'WiFi, Parking, Food, AC', (SELECT id FROM users WHERE email = 'zainab.hostel@owner.com'), '0300-2222222', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Gulshan Hostel', '56 Gulshan-e-Iqbal', 'Karachi', 13000, 'WiFi, Food', (SELECT id FROM users WHERE email = 'zainab.hostel@owner.com'), '0300-2222222', 0;

-- Hostels by Bilal Ahmed (bilal.hostel@owner.com)
INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Islamabad F-7 Hostel', '78 F-7/2, Street 45', 'Islamabad', 17000, 'WiFi, Parking, Food, Laundry, AC', (SELECT id FROM users WHERE email = 'bilal.hostel@owner.com'), '0300-3333333', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Rawalpindi Hostel', '90 Satellite Town', 'Rawalpindi', 11000, 'WiFi, Food', (SELECT id FROM users WHERE email = 'bilal.hostel@owner.com'), '0300-3333333', 1;

INSERT INTO hostels (name, address, city, rent, facilities, owner_id, contact_number, is_verified)
SELECT 'Faisalabad Hostel', '112 Jaranwala Road', 'Faisalabad', 10000, 'WiFi, Parking, Food', (SELECT id FROM users WHERE email = 'bilal.hostel@owner.com'), '0300-3333333', 0;

-- ============================================
-- REVIEWS TABLE
-- ============================================
-- Note: Using subqueries to find IDs by name/email for reliability
-- Rating: 1-5

-- Reviews for Gulberg Boys Hostel
INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 5, 'Excellent hostel! Clean rooms, good food, and friendly staff. Highly recommended!', (SELECT id FROM hostels WHERE name = 'Gulberg Boys Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com');

INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 4, 'Good value for money. WiFi is fast and location is perfect for students.', (SELECT id FROM hostels WHERE name = 'Gulberg Boys Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com');

-- Reviews for Model Town Hostel
INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 4, 'Nice place to stay. Food quality is good and owner is very cooperative.', (SELECT id FROM hostels WHERE name = 'Model Town Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com');

INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 3, 'Average hostel. Could be better but price is reasonable.', (SELECT id FROM hostels WHERE name = 'Model Town Hostel'), (SELECT id FROM users WHERE email = 'ayesha.malik@student.com');

-- Reviews for Karachi University Hostel
INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 5, 'Best hostel near university! Very clean and well-maintained.', (SELECT id FROM hostels WHERE name = 'Karachi University Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com');

INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 4, 'Good facilities and reasonable rent. Owner is helpful.', (SELECT id FROM hostels WHERE name = 'Karachi University Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com');

-- Reviews for Clifton Boys Hostel
INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 5, 'Amazing location and facilities. AC works great in summer!', (SELECT id FROM hostels WHERE name = 'Clifton Boys Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com');

INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 4, 'Good hostel with parking facility. Recommended for students.', (SELECT id FROM hostels WHERE name = 'Clifton Boys Hostel'), (SELECT id FROM users WHERE email = 'ayesha.malik@student.com');

-- Reviews for Islamabad F-7 Hostel
INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 5, 'Premium hostel with all modern facilities. Worth the price!', (SELECT id FROM hostels WHERE name = 'Islamabad F-7 Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com');

INSERT INTO reviews (rating, comment, hostel_id, student_id)
SELECT 4, 'Clean and well-managed. Good security and peaceful environment.', (SELECT id FROM hostels WHERE name = 'Islamabad F-7 Hostel'), (SELECT id FROM users WHERE email = 'ayesha.malik@student.com');

-- ============================================
-- BOOKINGS TABLE
-- ============================================
-- Note: status can be 'pending', 'confirmed', or 'cancelled'

INSERT INTO bookings (hostel_id, student_id, status)
SELECT (SELECT id FROM hostels WHERE name = 'Gulberg Boys Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com'), 'confirmed';

INSERT INTO bookings (hostel_id, student_id, status)
SELECT (SELECT id FROM hostels WHERE name = 'Model Town Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com'), 'pending';

INSERT INTO bookings (hostel_id, student_id, status)
SELECT (SELECT id FROM hostels WHERE name = 'Karachi University Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com'), 'confirmed';

INSERT INTO bookings (hostel_id, student_id, status)
SELECT (SELECT id FROM hostels WHERE name = 'Clifton Boys Hostel'), (SELECT id FROM users WHERE email = 'ayesha.malik@student.com'), 'pending';

INSERT INTO bookings (hostel_id, student_id, status)
SELECT (SELECT id FROM hostels WHERE name = 'Islamabad F-7 Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com'), 'confirmed';

-- ============================================
-- ENQUIRIES TABLE
-- ============================================
-- Note: type can be 'enquiry' or 'schedule_visit'
-- status can be 'pending' or 'responded'

INSERT INTO enquiries (hostel_id, student_id, type, message, status)
SELECT (SELECT id FROM hostels WHERE name = 'Gulberg Boys Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com'), 'enquiry', 'Hi, I am interested in your hostel. Can you tell me about the room availability?', 'responded';

INSERT INTO enquiries (hostel_id, student_id, type, message, status)
SELECT (SELECT id FROM hostels WHERE name = 'Model Town Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com'), 'schedule_visit', 'I would like to schedule a visit this weekend.', 'pending';

INSERT INTO enquiries (hostel_id, student_id, type, message, status)
SELECT (SELECT id FROM hostels WHERE name = 'Karachi University Hostel'), (SELECT id FROM users WHERE email = 'ahmed.ali@student.com'), 'enquiry', 'What are the facilities included in the rent?', 'responded';

INSERT INTO enquiries (hostel_id, student_id, type, message, status)
SELECT (SELECT id FROM hostels WHERE name = 'Clifton Boys Hostel'), (SELECT id FROM users WHERE email = 'ayesha.malik@student.com'), 'schedule_visit', 'Can I visit tomorrow at 3 PM?', 'pending';

INSERT INTO enquiries (hostel_id, student_id, type, message, status)
SELECT (SELECT id FROM hostels WHERE name = 'Islamabad F-7 Hostel'), (SELECT id FROM users WHERE email = 'hassan.raza@student.com'), 'enquiry', 'Is there parking available for motorcycles?', 'responded';

-- Update replied_at for responded enquiries
UPDATE enquiries SET replied_at = NOW() WHERE status = 'responded';

-- ============================================
-- VERIFICATION
-- ============================================
-- Check inserted data
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Hostels', COUNT(*) FROM hostels
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'Bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'Enquiries', COUNT(*) FROM enquiries;

