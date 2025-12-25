# Deployment Checklist - HostelGo

## ✅ Pre-Deployment Checklist

### Backend (Railway)
- [x] Database configuration supports Railway MySQL environment variables
- [x] CORS configured to allow Vercel domains
- [x] Server uses `process.env.PORT` (Railway auto-provides)
- [x] Database initialization handles Railway MySQL connection
- [x] Error handling in place
- [x] Health check endpoint available (`/`)

### Frontend (Vercel)
- [x] API URL uses environment variable (`VITE_API_URL`)
- [x] Default fallback to Railway URL if env var not set
- [x] No hardcoded localhost URLs in production code
- [x] Build configuration correct (Vite)

## 🔧 Configuration Steps

### 1. Railway Backend Setup

**Environment Variables to Set:**
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

**Note:** Railway automatically provides MySQL variables, so you can reference them using `${{MySQL.MYSQLHOST}}` syntax.

### 2. Vercel Frontend Setup

**Environment Variable to Set:**
```
VITE_API_URL=https://hostelgo.up.railway.app
```

## 🧪 Testing After Deployment

1. **Test Backend:**
   ```bash
   curl https://hostelgo.up.railway.app
   ```
   Should return API info JSON

2. **Test Frontend:**
   - Visit your Vercel URL
   - Check browser console for errors
   - Try logging in with default admin:
     - Email: `admin.pk@example.com`
     - Password: `admin123`

3. **Test API Integration:**
   - Sign up a new user
   - Create a hostel listing (as owner)
   - Verify the hostel (as admin)
   - View hostels (as student)

## 🐛 Common Issues & Solutions

### Issue: CORS Errors
**Solution:** 
- Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- Check that CORS middleware is allowing your domain

### Issue: Database Connection Failed
**Solution:**
- Verify MySQL service is running in Railway
- Check environment variables match Railway's MySQL service
- Ensure database exists (Railway creates it automatically)

### Issue: API Calls Return 404
**Solution:**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check that backend URL is accessible (test with curl)
- Ensure backend service is deployed and running

### Issue: Build Fails on Vercel
**Solution:**
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Check for TypeScript errors
- Ensure Node.js version is compatible

## 📝 Files Modified for Deployment

1. **Backend:**
   - `server.js` - CORS configuration updated
   - `config/database.js` - Railway MySQL env var support

2. **Frontend:**
   - `src/lib/api.ts` - Default Railway URL fallback

3. **Documentation:**
   - `DEPLOYMENT.md` - Complete deployment guide
   - `DEPLOYMENT_CHECKLIST.md` - This file

## 🎯 Next Steps

1. Deploy backend to Railway
2. Deploy frontend to Vercel
3. Set environment variables in both platforms
4. Test all functionality
5. Update admin password after first login
6. Monitor logs for any errors

---

**Ready to deploy!** 🚀

