import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          📚 ClassConnect
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/') ? 'active' : ''}`} 
                to="/"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/subjects') ? 'active' : ''}`} 
                to="/subjects"
              >
                Subjects
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/timetable') ? 'active' : ''}`} 
                to="/timetable"
              >
                Timetable
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${isActive('/attendance') ? 'active' : ''}`} 
                to="/attendance"
              >
                Attendance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;