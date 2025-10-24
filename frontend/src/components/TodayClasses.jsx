import { formatTime } from '../utils/helpers';

const TodayClasses = ({ classes }) => {
  if (!classes || classes.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="mb-0">📅 Today's Classes</h6>
        </div>
        <div className="card-body text-center py-4">
          <p className="text-muted mb-0">No classes scheduled for today</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">📅 Today's Classes</h6>
      </div>
      <div className="card-body p-0">
        <div className="list-group list-group-flush">
          {classes.map((classItem, index) => (
            <div key={index} className="list-group-item bg-transparent border-secondary">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className={`mb-1 ${classItem.subject_type === 'Lab' ? 'subject-lab' : 'subject-core'}`}>
                    {classItem.subject_name}
                  </h6>
                  <small className="text-muted">{classItem.subject_code}</small>
                </div>
                <div className="text-end">
                  <div className="time-range">
                    {formatTime(classItem.start_time)} - {formatTime(classItem.end_time)}
                  </div>
                  <small className={`badge ${classItem.subject_type === 'Lab' ? 'bg-info' : 'bg-secondary'}`}>
                    {classItem.subject_type}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayClasses;