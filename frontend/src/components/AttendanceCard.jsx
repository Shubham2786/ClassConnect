import { useState } from 'react';
import { attendanceAPI } from '../services/api';
import { getAttendanceColor, getCurrentDate } from '../utils/helpers';

const AttendanceCard = ({ subject, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  
  const percentage = subject.total_classes > 0 
    ? Math.round((subject.present_count / subject.total_classes) * 100) 
    : 0;

  const handleMarkAttendance = async (status) => {
    setLoading(true);
    try {
      await attendanceAPI.mark({
        subject_id: subject.id,
        date: getCurrentDate(),
        status
      });
      onUpdate();
    } catch (error) {
      console.error('Error marking attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className="card-title mb-1">{subject.name}</h6>
            <small className="text-muted">{subject.code}</small>
          </div>
          <span className={`badge ${getAttendanceColor(percentage)}`}>
            {percentage}%
          </span>
        </div>
        
        <div className="mb-3">
          <div className="d-flex justify-content-between text-sm">
            <span>Present: {subject.present_count || 0}</span>
            <span>Total: {subject.total_classes || 0}</span>
          </div>
          <div className="progress mt-2" style={{ height: '6px' }}>
            <div 
              className={`progress-bar ${percentage >= 75 ? 'bg-success' : percentage >= 70 ? 'bg-warning' : 'bg-danger'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="d-grid gap-2 d-md-flex">
          <button 
            className="btn btn-success btn-sm flex-fill"
            onClick={() => handleMarkAttendance('Present')}
            disabled={loading}
          >
            {loading ? '...' : '✓ Present'}
          </button>
          <button 
            className="btn btn-danger btn-sm flex-fill"
            onClick={() => handleMarkAttendance('Absent')}
            disabled={loading}
          >
            {loading ? '...' : '✗ Absent'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;