# Deployment Guide - HostelGo

This guide will help you deploy HostelGo to Railway (Backend + Database) and Vercel (Frontend).

## 🚀 Deployment Overview

- **Backend + Database**: Railway (https://hostelgo.up.railway.app)
- **Frontend**: Vercel

## 📋 Prerequisites

1. GitHub account
2. Railway account (https://railway.app)
3. Vercel account (https://vercel.com)
4. Git installed locally

---

## 🔧 Backend Deployment (Railway)

### Step 1: Prepare Backend for Railway

1. **Navigate to backend directory:**
   ```bash
   cd hostel-finder-backend
   ```

2. **Ensure your `package.json` has the correct start script:**
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

### Step 2: Deploy to Railway

1. **Create a new Railway project:**
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or "Empty Project" if deploying manually)

2. **Add MySQL Database:**
   - In your Railway project, click "+ New"
   - Select "Database" → "MySQL"
   - Railway will automatically create a MySQL database

3. **Deploy Backend Service:**
   - Click "+ New" → "GitHub Repo" (or "Empty Service" for manual deployment)
   - Select your repository
   - Railway will auto-detect Node.js

4. **Configure Environment Variables:**
   - Go to your backend service → "Variables"
   - Add the following variables (Railway auto-provides MySQL vars):
     ```
     DB_HOST=${{MySQL.MYSQLHOST}}
     DB_USER=${{MySQL.MYSQLUSER}}
     DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
     DB_NAME=${{MySQL.MYSQLDATABASE}}
     DB_PORT=${{MySQL.MYSQLPORT}}
     PORT=5000
     NODE_ENV=production
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Or use Railway's auto-provided MySQL variables directly (they're already set)

5. **Get Your Backend URL:**
   - Railway will provide a URL like: `https://hostelgo.up.railway.app`
   - Note this URL for frontend configuration

### Step 3: Verify Backend Deployment

1. **Test the API:**
   ```bash
   curl https://hostelgo.up.railway.app
   ```
   Should return: `{"message":"Hostel Finder Backend API","status":"Running",...}`

2. **Check Database Initialization:**
   - Check Railway logs to ensure database tables were created
   - Look for: `✅ Database initialized on Railway`

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Vercel

1. **Navigate to frontend directory:**
   ```bash
   cd hostel-finder-frontend
   ```

2. **Create `.env.local` file (for local testing):**
   ```env
   VITE_API_URL=https://hostelgo.up.railway.app
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Vercel Dashboard:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `hostel-finder-frontend` directory as root
   - Framework Preset: **Vite**

3. **Configure Environment Variables:**
   - In Vercel project settings → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://hostelgo.up.railway.app
     ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like: `https://your-app.vercel.app`

### Step 3: Update Backend CORS (if needed)

1. **Update Railway Environment Variables:**
   - Go to Railway → Your Backend Service → Variables
   - Update `FRONTEND_URL` with your Vercel URL:
     ```
     FRONTEND_URL=https://your-app.vercel.app
     ```
   - Redeploy if necessary

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible at Railway URL
- [ ] Frontend is accessible at Vercel URL
- [ ] Frontend can communicate with backend (check browser console)
- [ ] Database tables are created (check Railway logs)
- [ ] Admin user exists (email: `admin.pk@example.com`, password: `admin123`)
- [ ] CORS is configured correctly
- [ ] Environment variables are set in both platforms

---

## 🔍 Troubleshooting

### Backend Issues

**Problem: Database connection fails**
- Check Railway MySQL service is running
- Verify environment variables match Railway's MySQL service
- Check Railway logs for connection errors

**Problem: Tables not created**
- Check Railway logs for initialization errors
- Ensure database exists (Railway creates it automatically)
- Verify MySQL service is connected to backend service

**Problem: CORS errors**
- Update `FRONTEND_URL` in Railway environment variables
- Check backend CORS configuration in `server.js`
- Verify frontend URL matches exactly

### Frontend Issues

**Problem: API calls fail**
- Check `VITE_API_URL` is set correctly in Vercel
- Verify backend URL is accessible (test with curl)
- Check browser console for CORS errors
- Ensure backend is running

**Problem: Build fails**
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

---

## 🔐 Default Admin Credentials

After deployment, the default admin account is:
- **Email**: `admin.pk@example.com`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change this password immediately after first login!

---

## 📝 Environment Variables Summary

### Backend (Railway)
```
DB_HOST=${{MySQL.MYSQLHOST}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
DB_PORT=${{MySQL.MYSQLPORT}}
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://hostelgo.up.railway.app
```

---

## 🎉 Success!

Once deployed, your HostelGo application should be live and accessible!

- **Backend**: https://hostelgo.up.railway.app
- **Frontend**: https://your-app.vercel.app

Happy hosting! 🚀

