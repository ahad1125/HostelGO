# Quick Seed Data Guide

## How to Insert Sample Data

### Option 1: Using Railway Database UI (Easiest)

1. Go to Railway Dashboard → Your MySQL Service
2. Click on "Data" or "Query" tab
3. Copy and paste the SQL from `seed-data.sql`
4. Execute the SQL

### Option 2: Using MySQL Command Line

If you have MySQL CLI access:

```bash
mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE < seed-data.sql
```

### Option 3: Manual Insert via Railway UI

1. Go to Railway → MySQL Service → Data/Query tab
2. Insert users first (they're needed for foreign keys)
3. Then insert hostels (they reference users)
4. Then insert reviews, bookings, enquiries

## Sample Login Credentials

After seeding, you can use these accounts:

### Admin
- Email: `admin.pk@example.com`
- Password: `admin123`

### Students
- Email: `ahmed.ali@student.com`
- Password: `student123`
- Email: `fatima.khan@student.com`
- Password: `student123`

### Owners
- Email: `asif.hostel@owner.com`
- Password: `owner123`
- Email: `zainab.hostel@owner.com`
- Password: `owner123`

## What Gets Created

- **4 Students** - Can view and review verified hostels
- **3 Owners** - Can create and manage hostels
- **1 Admin** - Can verify hostels
- **9 Hostels** - Mix of verified (6) and pending (3)
- **8 Reviews** - Student reviews for various hostels
- **5 Bookings** - Some confirmed, some pending
- **5 Enquiries** - Mix of enquiries and visit requests

## Notes

- All passwords are `student123`, `owner123`, or `admin123` (plain text for prototype)
- Some hostels are verified (visible to students), some are pending
- Reviews are linked to specific hostels and students
- Foreign key constraints ensure data integrity

