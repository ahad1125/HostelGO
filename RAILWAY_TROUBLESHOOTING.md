# Railway Backend Troubleshooting Guide

## 🔴 Current Issue: Database Error (500)

The backend is returning "Database error" when trying to fetch hostels. This indicates a database connection or query problem.

## 🔍 Step-by-Step Fix

### Step 1: Check Railway Logs

1. Go to your Railway dashboard
2. Click on your **backend service**
3. Go to the **"Deployments"** tab
4. Click on the latest deployment
5. Check the **"Logs"** tab

**Look for:**
- `✅ Database initialized on Railway` - This means DB init succeeded
- `❌ DB init failed:` - This means DB connection failed
- Any MySQL connection errors

### Step 2: Verify Database Service is Connected

1. In Railway, check if you have a **MySQL service** running
2. If not, create one:
   - Click "+ New" → "Database" → "MySQL"
3. **Link the database to your backend:**
   - Go to your backend service
   - Click "Settings" → "Variables"
   - You should see Railway's auto-provided MySQL variables

### Step 3: Check Environment Variables

In your **backend service** → **Variables**, you should have:

**Railway Auto-Provides (if MySQL is linked):**
```
MYSQLHOST=xxx.railway.app
MYSQLUSER=root
MYSQLPASSWORD=xxx
MYSQLDATABASE=railway
MYSQLPORT=3306
```

**OR manually set:**
```
DB_HOST=xxx.railway.app
DB_USER=root
DB_PASSWORD=xxx
DB_NAME=railway
DB_PORT=3306
```

**Also set:**
```
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://hostelgo.vercel.app
```

### Step 4: Verify Database Connection

The code supports both Railway's auto-provided variables (`MYSQLHOST`, etc.) and custom ones (`DB_HOST`, etc.). Make sure at least one set is configured.

### Step 5: Check Database Initialization

Look in Railway logs for:
- `✅ Database initialized on Railway` - Success
- `❌ DB init failed:` - Failure (check the error message)

If initialization failed, the tables weren't created, which will cause query errors.

### Step 6: Test Database Connection Manually

You can test the connection by checking Railway logs when the server starts. The database initialization runs automatically.

## 🛠️ Common Issues & Solutions

### Issue 1: "Cannot connect to MySQL server"

**Solution:**
- Verify MySQL service is running in Railway
- Check that MySQL service is linked to your backend service
- Verify environment variables are correct
- Check Railway logs for connection errors

### Issue 2: "Table doesn't exist"

**Solution:**
- Database initialization failed
- Check Railway logs for initialization errors
- Redeploy the backend service to trigger re-initialization
- Manually verify tables exist in Railway MySQL

### Issue 3: "Access denied for user"

**Solution:**
- Verify `DB_USER` and `DB_PASSWORD` are correct
- Check Railway MySQL service credentials
- Ensure database user has proper permissions

### Issue 4: Environment Variables Not Set

**Solution:**
- Go to backend service → Variables
- Add all required variables (see Step 3)
- Redeploy the service

## 📋 Quick Checklist

- [ ] MySQL service exists in Railway
- [ ] MySQL service is linked to backend service
- [ ] Environment variables are set (MYSQLHOST, MYSQLUSER, etc.)
- [ ] Railway logs show "✅ Database initialized on Railway"
- [ ] No connection errors in logs
- [ ] Backend service is running (check status)

## 🔧 Manual Database Check (Optional)

If you have Railway CLI or MySQL client:

```bash
# Connect to Railway MySQL
mysql -h $MYSQLHOST -u $MYSQLUSER -p$MYSQLPASSWORD $MYSQLDATABASE

# Check if tables exist
SHOW TABLES;

# Should show: users, hostels, reviews, bookings, enquiries
```

## 📞 Next Steps

1. **Check Railway logs first** - This will tell you the exact error
2. **Verify MySQL service is linked** to backend
3. **Check environment variables** are set correctly
4. **Redeploy** if you made changes

## 🎯 Expected Log Output

When everything works, you should see in Railway logs:

```
✅ Database initialized on Railway
🚀 Server running on port 5000
```

If you see errors, share them and we can fix the specific issue!

