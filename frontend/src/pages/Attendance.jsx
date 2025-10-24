import { useFetch } from '../hooks/useFetch';
import { attendanceAPI } from '../services/api';
import { getAttendanceColor } from '../utils/helpers';

const Attendance = () => {
  const { data: attendanceStats, loading } = useFetch(attendanceAPI.getStats);

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
          <h2>📊 Attendance Overview</h2>
        </div>
      </div>

      <div className="row">
        {attendanceStats && attendanceStats.length > 0 ? (
          attendanceStats.map((subject) => {
            const percentage = subject.total_classes > 0 
              ? Math.round((subject.present_count / subject.total_classes) * 100) 
              : 0;
            
            const classesNeeded = percentage < 75 
              ? Math.ceil((0.75 * subject.total_classes - subject.present_count) / 0.25)
              : 0;

            return (
              <div key={subject.id} className="col-lg-6 col-xl-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="card-title mb-1">{subject.name}</h5>
                        <small className="text-muted">{subject.code}</small>
                      </div>
                      <span className={`badge fs-6 ${getAttendanceColor(percentage)}`}>
                        {percentage}%
                      </span>
                    </div>

                    <div className="row text-center mb-3">
                      <div className="col-4">
                        <div className="text-success fw-bold fs-4">{subject.present_count || 0}</div>
                        <small className="text-muted">Present</small>
                      </div>
                      <div className="col-4">
                        <div className="text-danger fw-bold fs-4">
                          {(subject.total_classes || 0) - (subject.present_count || 0)}
                        </div>
                        <small className="text-muted">Absent</small>
                      </div>
                      <div className="col-4">
                        <div className="text-primary fw-bold fs-4">{subject.total_classes || 0}</div>
                        <small className="text-muted">Total</small>
                      </div>
                    </div>

                    <div className="progress mb-3" style={{ height: '8px' }}>
                      <div 
                        className={`progress-bar ${percentage >= 75 ? 'bg-success' : percentage >= 70 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {percentage < 75 && classesNeeded > 0 && (
                      <div className="alert alert-warning py-2 mb-0">
                        <small>
                          <strong>⚠️ Need {classesNeeded} more classes</strong> to reach 75%
                        </small>
                      </div>
                    )}

                    {percentage >= 75 && (
                      <div className="alert alert-success py-2 mb-0">
                        <small>
                          <strong>✅ Good attendance!</strong> Keep it up
                        </small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <h5 className="text-muted mb-3">No attendance data found</h5>
                <p className="text-muted">Start marking attendance from the dashboard to see detailed statistics here.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {attendanceStats && attendanceStats.length > 0 && (
        <div className="row mt-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">📈 Attendance Summary</h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Subject</th>
                        <th>Code</th>
                        <th>Present</th>
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceStats.map((subject) => {
                        const percentage = subject.total_classes > 0 
                          ? Math.round((subject.present_count / subject.total_classes) * 100) 
                          : 0;
                        
                        return (
                          <tr key={subject.id}>
                            <td>{subject.name}</td>
                            <td>{subject.code}</td>
                            <td className="text-success">{subject.present_count || 0}</td>
                            <td>{subject.total_classes || 0}</td>
                            <td className={getAttendanceColor(percentage)}>
                              {percentage}%
                            </td>
                            <td>
                              <span className={`badge ${percentage >= 75 ? 'bg-success' : percentage >= 70 ? 'bg-warning' : 'bg-danger'}`}>
                                {percentage >= 75 ? 'Good' : percentage >= 70 ? 'Average' : 'Poor'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;