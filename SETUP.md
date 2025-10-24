# 🚀 ClassConnect Setup Guide

## Quick Start (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend  
npm install
```

### 2. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on `http://localhost:5173`

### 3. Access the Application

Open your browser and go to: `http://localhost:5173`

## 🎯 What You'll See

1. **Dashboard** - Welcome screen with today's classes and attendance overview
2. **Subjects** - Add/edit/delete subjects (sample data included)
3. **Timetable** - Weekly schedule view
4. **Attendance** - Mark attendance and view statistics

## 📊 Sample Data

The application comes with sample subjects and timetable entries:
- Data Structures and Algorithms (CS301)
- Database Management Systems (CS302)
- Web Development Lab (CS303)
- Computer Networks (CS304)
- Software Engineering (CS305)

## 🔧 Environment Variables

**Backend (.env):**
```
PORT=5000
NODE_ENV=development
DB_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000/api
```

## 🗄️ Database

- SQLite database is created automatically
- Sample data is seeded in development mode
- Database file: `backend/database.sqlite`

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 5173  
npx kill-port 5173
```

### Database Issues
```bash
# Delete database file to reset
rm backend/database.sqlite
# Restart backend to recreate
```

### CORS Errors
- Ensure backend is running on port 5000
- Check CORS_ORIGIN in backend/.env matches frontend URL

## 📱 Mobile Testing

The app is fully responsive. Test on mobile by:
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access: `http://YOUR_IP:5173` from mobile device

## 🚀 Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `frontend/src/index.css`
- **API URL**: Update `VITE_API_URL` in frontend/.env
- **Database**: Modify schema in `backend/database.js`

## 📦 Dependencies

**Frontend:**
- React 19.1.1
- Vite 7.1.2
- Bootstrap 5.3.7
- Axios 1.11.0
- Recharts 3.1.2

**Backend:**
- Express 4.18.2
- SQLite3 5.1.6
- CORS 2.8.5
- Helmet (security)
- Compression

## ✅ Success Checklist

- [ ] Backend server starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can navigate between pages
- [ ] Can add/edit subjects
- [ ] Can mark attendance
- [ ] Charts display correctly
- [ ] Mobile responsive design works

## 🆘 Need Help?

1. Check console for error messages
2. Verify all dependencies installed
3. Ensure ports 5000 and 5173 are available
4. Check environment variables are set correctly

**Happy coding! 🎉**