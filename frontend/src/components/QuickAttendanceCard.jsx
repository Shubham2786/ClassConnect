import { useState } from 'react';
import { attendanceAPI } from '../services/api';
import { formatTime, getCurrentDate } from '../utils/helpers';

const QuickAttendanceCard = ({ classItem, onMarkAttendance, onRemove }) => {
  const [loading, setLoading] = useState(false);

  const handleMark = async (status) => {
    setLoading(true);
    try {
      await attendanceAPI.mark({
        subject_id: classItem.subject_id,
        date: getCurrentDate(),
        status
      });
      
      // Show toast and remove card
      const message = `Marked ${status} for ${classItem.subject_name} (${formatTime(classItem.start_time)}–${formatTime(classItem.end_time)})`;
      console.log(message); // Replace with actual toast
      
      onMarkAttendance();
      setTimeout(() => onRemove(classItem.id), 300);
    } catch (error) {
      console.error('Error marking attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card quick-attendance-card">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h6 className={`mb-1 ${classItem.subject_type === 'Lab' ? 'subject-lab' : 'subject-core'}`}>
              {classItem.subject_name}
            </h6>
            <small className="text-muted">{classItem.subject_code}</small>
          </div>
          <span className={`badge ${classItem.subject_type === 'Lab' ? 'bg-info' : 'bg-secondary'}`}>
            {classItem.subject_type}
          </span>
        </div>
        
        <div className="time-range mb-3 small">
          {formatTime(classItem.start_time)} – {formatTime(classItem.end_time)}
        </div>
        
        <div className="d-grid gap-2 d-md-flex">
          <button 
            className="btn btn-success btn-sm flex-fill"
            onClick={() => handleMark('Present')}
            disabled={loading}
          >
            {loading ? '...' : '✅ Present'}
          </button>
          <button 
            className="btn btn-danger btn-sm flex-fill"
            onClick={() => handleMark('Absent')}
            disabled={loading}
          >
            {loading ? '...' : '❌ Absent'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickAttendanceCard;