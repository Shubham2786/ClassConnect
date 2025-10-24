import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Timetable from './pages/Timetable';
import Attendance from './pages/Attendance';
import SubjectDetail from './pages/SubjectDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/attendance/:id" element={<SubjectDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;