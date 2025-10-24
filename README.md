# 📚 ClassConnect - Student Academic Dashboard

A modern, full-stack web application for students to manage attendance, timetables, subjects, and academic analytics.

## 🚀 Features

- **Subject Management**: Add, edit, and delete subjects with type indicators (Theory/Lab)
- **Attendance Tracking**: Quick mark attendance with real-time percentage calculations
- **Timetable System**: Weekly schedule view with today's classes
- **Analytics Dashboard**: Visual charts and attendance statistics
- **Responsive Design**: Mobile-first approach with dark theme
- **Real-time Updates**: Live data synchronization between frontend and backend

## 🛠️ Technology Stack

### Frontend
- React 19.1.1 with functional components and hooks
- Vite 7.1.2 for fast development and building
- Bootstrap 5.3.7 for responsive UI components
- Axios 1.11.0 for API communication
- Recharts 3.1.2 for data visualization
- React Router for navigation

### Backend
- Node.js 20.x with Express 4.18.2
- SQLite3 5.1.6 for lightweight database
- CORS, Helmet for security
- Compression for performance
- Parameterized queries for SQL injection prevention

## 📦 Installation & Setup

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🗄️ Database Schema

The application uses SQLite with the following tables:
- `subjects` - Subject information (name, code, type, credits)
- `timetable` - Weekly schedule entries
- `attendance` - Daily attendance records
- `holidays` - Holiday calendar
- `semester_settings` - Academic calendar settings
- `marks` - Exam marks and grades

## 🔧 API Endpoints

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create new subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Attendance
- `GET /api/attendance/stats` - Get attendance statistics
- `GET /api/attendance/subject/:id` - Get subject attendance
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Timetable
- `GET /api/timetable` - Get full timetable
- `GET /api/timetable/today` - Get today's classes
- `POST /api/timetable` - Add timetable entry

## 🎨 Design System

### Color Palette
- Primary Background: `#1b1b1b`
- Secondary Background: `#292929`
- Accent Primary: `#ffa31a`
- Success: `#4ADE80`
- Danger: `#FF5252`
- Text Primary: `#ffffff`
- Text Secondary: `#808080`

### Typography
- Font Family: Inter (Google Fonts)
- Responsive font sizes with proper hierarchy

## 📱 Responsive Design

- Mobile-first approach
- Bootstrap grid system
- Collapsible navigation
- Touch-friendly buttons
- Optimized for all screen sizes

## 🔒 Security Features

- Helmet.js for HTTP security headers
- CORS configuration
- Input validation and sanitization
- Parameterized database queries
- Error handling middleware

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

### Backend (Railway)
1. Connect your GitHub repository to Railway
2. Set start command: `npm start`
3. Add environment variables
4. Deploy automatically on push

## 📊 Performance Optimizations

- Vite for fast builds and HMR
- Code splitting with React.lazy
- Optimized bundle size
- GZIP compression
- Efficient database queries
- Caching strategies

## 🧪 Development

### Available Scripts

#### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📈 Future Enhancements

- PWA support with offline mode
- Push notifications for class reminders
- Export/import data functionality
- Advanced analytics and reports
- Multi-semester support
- Grade tracking and GPA calculation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for students by students**