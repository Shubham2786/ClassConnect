import { useFetch } from '../hooks/useFetch';
import { timetableAPI } from '../services/api';
import { formatTime, getDayName } from '../utils/helpers';

const Timetable = () => {
  const { data: timetable, loading } = useFetch(timetableAPI.getAll);

  const groupedTimetable = timetable?.reduce((acc, item) => {
    const day = item.day_of_week;
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {}) || {};

  // Sort classes by start time for each day
  Object.keys(groupedTimetable).forEach(day => {
    groupedTimetable[day].sort((a, b) => a.start_time.localeCompare(b.start_time));
  });

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2>📅 Weekly Timetable</h2>
        </div>
      </div>

      <div className="row">
        {[1, 2, 3, 4, 5, 6].map(day => (
          <div key={day} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <h6 className="mb-0">{getDayName(day)}</h6>
              </div>
              <div className="card-body p-0">
                {groupedTimetable[day] && groupedTimetable[day].length > 0 ? (
                  <div className="list-group list-group-flush">
                    {groupedTimetable[day].map((classItem, index) => (
                      <div key={index} className="list-group-item bg-transparent border-secondary">
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className={`mb-1 ${classItem.subject_type === 'Lab' ? 'subject-lab' : 'subject-core'}`}>
                              {classItem.subject_name}
                            </h6>
                            <small className="text-muted">{classItem.subject_code}</small>
                          </div>
                          <div className="text-end">
                            <div className="time-range small">
                              {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
                            </div>
                            <span className={`badge ${classItem.subject_type === 'Lab' ? 'bg-info' : 'bg-secondary'} mt-1`}>
                              {classItem.subject_type}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="card-body text-center py-4">
                    <small className="text-muted">No classes scheduled</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!timetable || timetable.length === 0) && (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <h5 className="text-muted mb-3">No timetable entries found</h5>
                <p className="text-muted">Add subjects and create timetable entries to see your weekly schedule.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timetable;