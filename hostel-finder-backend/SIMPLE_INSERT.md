# Quick Insert - Just the Essentials

## Minimum Data Needed to Test

### 1. Add 1 Owner (for creating hostels)

Go to **users** table → "+ Row":
- name: `Muhammad Asif`
- email: `asif.hostel@owner.com`
- password: `owner123`
- role: `owner`
- contact_number: `0300-1111111`

**Note the ID** of this user (e.g., if it's ID 2)

### 2. Add 2-3 Verified Hostels

Go to **hostels** table → "+ Row" (repeat for each):

**Hostel 1:**
- name: `Gulberg Boys Hostel`
- address: `123 Main Boulevard, Gulberg III`
- city: `Lahore`
- rent: `15000`
- facilities: `WiFi, Parking, Food, Laundry, AC`
- owner_id: `[The ID from step 1]`
- contact_number: `0300-1111111`
- is_verified: `1` ✅

**Hostel 2:**
- name: `Model Town Hostel`
- address: `456 Model Town Road`
- city: `Lahore`
- rent: `12000`
- facilities: `WiFi, Parking, Food`
- owner_id: `[Same ID from step 1]`
- contact_number: `0300-1111111`
- is_verified: `1` ✅

**Hostel 3:**
- name: `Karachi University Hostel`
- address: `12 University Road, Near KU`
- city: `Karachi`
- rent: `14000`
- facilities: `WiFi, Food, Laundry`
- owner_id: `[Same ID from step 1]`
- contact_number: `0300-1111111`
- is_verified: `1` ✅

### 3. Add 1 Student (for testing login)

Go to **users** table → "+ Row":
- name: `Ahmed Ali`
- email: `ahmed.ali@student.com`
- password: `student123`
- role: `student`
- contact_number: `0300-1234567`

---

## That's It!

After inserting:
- ✅ Landing page carousel will show the 3 verified hostels
- ✅ Student can log in with `ahmed.ali@student.com` / `student123`
- ✅ Student can view hostels on dashboard

You can add more data later if needed!

