# Fix Hostels Data - Quick Guide

## The Problem

Your hostels are inserted but:
- Carousel shows 500 error
- Students can't see hostels

**Most likely cause:** The `is_verified` field is not set to `1` (verified)

## Quick Fix

### Step 1: Check Your Hostels

In Railway → MySQL → hostels table, check:
- Does each hostel have `is_verified` column?
- What value is in `is_verified`? (Should be `1` for verified)

### Step 2: Update is_verified Field

For each hostel you want to show:

1. Click on the hostel row (or the edit icon)
2. Find the `is_verified` field
3. Change it to `1` (or `true`)
4. Save

**OR** if you can edit directly in the table:
- Set `is_verified = 1` for all hostels you want visible

### Step 3: Verify owner_id

Make sure each hostel's `owner_id` matches an actual user ID:
- Your owner "ALI" has ID = 3
- So hostels should have `owner_id = 3`

### Step 4: Test

After updating:
1. Visit: `https://hostelgo.up.railway.app/hostels/public`
2. Should return JSON array with your hostels
3. Landing page carousel should work

## Required Fields Checklist

Each hostel MUST have:
- ✅ `name` - Hostel name
- ✅ `address` - Full address
- ✅ `city` - City name
- ✅ `rent` - Number (e.g., 15000)
- ✅ `facilities` - Text (e.g., "WiFi, Parking, Food")
- ✅ `owner_id` - Must match a user ID (your owner is ID 3)
- ✅ `is_verified` - Must be `1` (not 0, not NULL)
- ✅ `contact_number` - Optional but recommended

## Quick Test

After fixing, test the endpoint:
```
https://hostelgo.up.railway.app/hostels/public
```

Should return your verified hostels as JSON!

