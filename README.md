# Hostel Finder

A full-stack web application for finding and managing hostel listings. Students can search for verified hostels, owners can manage their listings, and admins can verify hostels.

## 📋 Project Overview

This project consists of:
- **Frontend**: React + TypeScript application with modern UI
- **Backend**: Node.js + Express.js REST API
- **Database**: MySQL (migrated from SQLite)

### Features

- **Students**: Search and view verified hostels, add reviews
- **Hostel Owners**: Create, update, and delete hostel listings
- **Admins**: Verify/unverify hostels, controlling visibility to students

## 🛠️ Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- CORS

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MySQL Server (v5.7 or higher, or MariaDB 10.2+)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Hostel Finder"
   ```

2. **Install MySQL:**
   - **Windows:** Download from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)
   - **macOS:** `brew install mysql`
   - **Linux:** `sudo apt-get install mysql-server` (Ubuntu/Debian)

3. **Start MySQL Service:**
   - **Windows:** MySQL should start automatically
   - **macOS:** `brew services start mysql`
   - **Linux:** `sudo systemctl start mysql`

4. **Install All Dependencies (One Command):**
   ```bash
   npm install
   ```
   
   This will automatically install dependencies for:
   - Root project (concurrently for running both servers)
   - Backend (Express, MySQL, etc.)
   - Frontend (React, Vite, etc.)

5. **Configure Database Connection:**
   
   Open `hostel-finder-backend/database.js` and update if needed:
   ```javascript
   const dbConfig = {
       host: "localhost",
       user: "root",              // Your MySQL username
       password: "your_password",  // Your MySQL password (or "" if no password)
       database: "hostel_finder",  // Database name
   };
   ```
   
   Or use environment variables (see backend README for details).

6. **Start Both Servers (One Command):**
   ```bash
   npm start
   ```
   
   This will start:
   - **Backend** on `http://localhost:5000` (creates database and tables automatically)
   - **Frontend** on `http://localhost:5173` (opens in browser automatically)
   
   The backend will automatically:
   - Create the database if it doesn't exist
   - Create all necessary tables
   - Seed initial data

## 📁 Project Structure

```
Hostel Finder/
├── hostel-finder-backend/     # Backend API
│   ├── server.js              # Main server file
│   ├── database.js            # MySQL connection and schema
│   ├── controllers/           # Business logic
│   ├── routes/                # API routes
│   ├── middleware/            # Auth middleware
│   └── README.md              # Backend documentation
│
├── hostel-finder-frontend/    # Frontend React app
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── contexts/          # React contexts
│   │   └── lib/                # Utilities
│   └── README.md              # Frontend documentation
│
└── README.md                  # This file
```

## 🔧 Configuration

### Backend Database Configuration

Edit `hostel-finder-backend/database.js`:

```javascript
const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",  // Update with your MySQL password
    database: process.env.DB_NAME || "hostel_finder",
};
```

Or use environment variables:
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password (default: empty)
- `DB_NAME` - Database name (default: hostel_finder)

### Frontend API Configuration

The frontend connects to the backend API. Make sure the backend URL in `hostel-finder-frontend/src/lib/api.ts` matches your backend server URL (default: `http://localhost:5000`).

## 📝 Available Scripts

From the root directory:

- `npm install` - Install all dependencies (root, backend, and frontend)
- `npm start` - Start both backend and frontend servers simultaneously
- `npm run start:backend` - Start only the backend server
- `npm run start:frontend` - Start only the frontend server
- `npm run build` - Build the frontend for production

## 📊 Database Schema

The application uses MySQL with the following tables:

1. **users** - User accounts (students, owners, admins)
2. **hostels** - Hostel listings
3. **reviews** - Student reviews for hostels
4. **bookings** - Booking records

See `hostel-finder-backend/README.md` for detailed schema information.

## 🔐 Default Accounts

After seeding, the following accounts are available:

- **Admin:**
  - Email: `admin.pk@example.com`
  - Password: `admin123`

- **Student:**
  - Email: `ahad@gmail.com`
  - Password: `1234`

- **Owners:**
  - Email: `ali.owner@example.com`, `sara.owner@example.com`, `usman.owner@example.com`
  - Password: `password123`

## 📡 API Documentation

Full API documentation is available in:
- `hostel-finder-backend/README.md` - Complete API reference
- `hostel-finder-backend/API_REFERENCE.md` - API endpoint details

## 🧪 Testing

### Backend Testing

See `hostel-finder-backend/TESTING_GUIDE.md` for testing instructions.

### Manual Testing

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Use the default accounts to test different user roles

## 🐛 Troubleshooting

### Backend Issues

- **MySQL Connection Error:**
  - Ensure MySQL is running
  - Check database credentials in `database.js`
  - Verify MySQL user has proper permissions

- **Port Already in Use:**
  - Change port in `server.js` or stop the process using port 5000

### Frontend Issues

- **API Connection Error:**
  - Ensure backend is running on `http://localhost:5000`
  - Check CORS settings in backend
  - Verify API URL in frontend configuration

### Database Issues

- **Tables Not Created:**
  - Check MySQL user permissions
  - Review error logs in console
  - Ensure database can be created

## 🔄 Migration Notes

This project was migrated from SQLite to MySQL. Key changes:

- Database driver changed from `sqlite3` to `mysql2`
- Query syntax updated to MySQL (AUTO_INCREMENT, ENUM, etc.)
- Callback-based queries converted to async/await
- Connection pooling implemented for better performance

## 📝 Development Notes

- **Password Storage:** Currently uses plain text (prototype only)
- **Authentication:** Simple email/password (no JWT/sessions)
- **CORS:** Enabled for all origins (adjust for production)

## 📄 License

This is an academic project prototype.

## 👥 Contributing

This is a university project. For questions or issues, please contact the project maintainers.

## 📚 Additional Documentation

- Backend: `hostel-finder-backend/README.md`
- Frontend: `hostel-finder-frontend/README.md`
- API Reference: `hostel-finder-backend/API_REFERENCE.md`
- Testing Guide: `hostel-finder-backend/TESTING_GUIDE.md`

