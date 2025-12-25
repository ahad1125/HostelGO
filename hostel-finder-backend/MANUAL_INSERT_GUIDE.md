# Manual Data Insert Guide for Railway

Since Railway doesn't have a query editor, use the "+ Row" button to insert data manually.

## Step-by-Step Instructions

### 1. Insert USERS First

Go to **users** table → Click **"+ Row"** and add these one by one:

#### Students:
1. **Ahmed Ali**
   - name: `Ahmed Ali`
   - email: `ahmed.ali@student.com`
   - password: `student123`
   - role: `student`
   - contact_number: `0300-1234567`

2. **Fatima Khan**
   - name: `Fatima Khan`
   - email: `fatima.khan@student.com`
   - password: `student123`
   - role: `student`
   - contact_number: `0300-2345678`

3. **Hassan Raza**
   - name: `Hassan Raza`
   - email: `hassan.raza@student.com`
   - password: `student123`
   - role: `student`
   - contact_number: `0300-3456789`

4. **Ayesha Malik**
   - name: `Ayesha Malik`
   - email: `ayesha.malik@student.com`
   - password: `student123`
   - role: `student`
   - contact_number: `0300-4567890`

#### Owners:
5. **Muhammad Asif**
   - name: `Muhammad Asif`
   - email: `asif.hostel@owner.com`
   - password: `owner123`
   - role: `owner`
   - contact_number: `0300-1111111`

6. **Zainab Sheikh**
   - name: `Zainab Sheikh`
   - email: `zainab.hostel@owner.com`
   - password: `owner123`
   - role: `owner`
   - contact_number: `0300-2222222`

7. **Bilal Ahmed**
   - name: `Bilal Ahmed`
   - email: `bilal.hostel@owner.com`
   - password: `owner123`
   - role: `owner`
   - contact_number: `0300-3333333`

**Note:** Admin user already exists (admin.pk@example.com / admin123)

---

### 2. Insert HOSTELS

Go to **hostels** table → Click **"+ Row"** and add these:

**Important:** You need to note the **ID** of each owner from the users table first!

#### For Muhammad Asif's hostels (find his ID from users table):
1. **Gulberg Boys Hostel**
   - name: `Gulberg Boys Hostel`
   - address: `123 Main Boulevard, Gulberg III`
   - city: `Lahore`
   - rent: `15000`
   - facilities: `WiFi, Parking, Food, Laundry, AC`
   - owner_id: `[Muhammad Asif's ID from users table]`
   - contact_number: `0300-1111111`
   - is_verified: `1`

2. **Model Town Hostel**
   - name: `Model Town Hostel`
   - address: `456 Model Town Road`
   - city: `Lahore`
   - rent: `12000`
   - facilities: `WiFi, Parking, Food`
   - owner_id: `[Muhammad Asif's ID]`
   - contact_number: `0300-1111111`
   - is_verified: `1`

3. **DHA Phase 5 Hostel**
   - name: `DHA Phase 5 Hostel`
   - address: `789 DHA Phase 5, Block A`
   - city: `Lahore`
   - rent: `18000`
   - facilities: `WiFi, Parking, Food, Laundry, AC, Gym`
   - owner_id: `[Muhammad Asif's ID]`
   - contact_number: `0300-1111111`
   - is_verified: `0`

#### For Zainab Sheikh's hostels (find her ID from users table):
4. **Karachi University Hostel**
   - name: `Karachi University Hostel`
   - address: `12 University Road, Near KU`
   - city: `Karachi`
   - rent: `14000`
   - facilities: `WiFi, Food, Laundry`
   - owner_id: `[Zainab Sheikh's ID]`
   - contact_number: `0300-2222222`
   - is_verified: `1`

5. **Clifton Boys Hostel**
   - name: `Clifton Boys Hostel`
   - address: `34 Clifton Block 2`
   - city: `Karachi`
   - rent: `16000`
   - facilities: `WiFi, Parking, Food, AC`
   - owner_id: `[Zainab Sheikh's ID]`
   - contact_number: `0300-2222222`
   - is_verified: `1`

6. **Gulshan Hostel**
   - name: `Gulshan Hostel`
   - address: `56 Gulshan-e-Iqbal`
   - city: `Karachi`
   - rent: `13000`
   - facilities: `WiFi, Food`
   - owner_id: `[Zainab Sheikh's ID]`
   - contact_number: `0300-2222222`
   - is_verified: `0`

#### For Bilal Ahmed's hostels (find his ID from users table):
7. **Islamabad F-7 Hostel**
   - name: `Islamabad F-7 Hostel`
   - address: `78 F-7/2, Street 45`
   - city: `Islamabad`
   - rent: `17000`
   - facilities: `WiFi, Parking, Food, Laundry, AC`
   - owner_id: `[Bilal Ahmed's ID]`
   - contact_number: `0300-3333333`
   - is_verified: `1`

8. **Rawalpindi Hostel**
   - name: `Rawalpindi Hostel`
   - address: `90 Satellite Town`
   - city: `Rawalpindi`
   - rent: `11000`
   - facilities: `WiFi, Food`
   - owner_id: `[Bilal Ahmed's ID]`
   - contact_number: `0300-3333333`
   - is_verified: `1`

9. **Faisalabad Hostel**
   - name: `Faisalabad Hostel`
   - address: `112 Jaranwala Road`
   - city: `Faisalabad`
   - rent: `10000`
   - facilities: `WiFi, Parking, Food`
   - owner_id: `[Bilal Ahmed's ID]`
   - contact_number: `0300-3333333`
   - is_verified: `0`

---

### 3. Optional: Insert REVIEWS, BOOKINGS, ENQUIRIES

You can add these later if needed. For now, just having users and hostels is enough to test the application.

---

## Quick Tip: Finding IDs

When inserting hostels, you need the owner's ID:
1. Go to **users** table
2. Find the owner's email (e.g., `asif.hostel@owner.com`)
3. Note the **id** column value
4. Use that ID in the `owner_id` field when inserting hostels

Same process for reviews, bookings, and enquiries - you'll need student IDs and hostel IDs.

---

## Minimum Required Data

**At minimum, insert:**
1. ✅ Users (students and owners)
2. ✅ Hostels (at least 2-3 verified ones)

This is enough to test the landing page carousel and student login!

