import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { attendanceAPI, subjectsAPI } from '../services/api';
import { formatDate } from '../utils/helpers';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const SubjectDetail = () => {
  const { id } = useParams();
  const { data: subject } = useFetch(() => subjectsAPI.getAll().then(res => res.data.find(s => s.id == id)));
  const { data: attendance, loading, refetch } = useFetch(() => attendanceAPI.getBySubject(id));
  const [editingId, setEditingId] = useState(null);

  const attendanceData = attendance?.map((record, index) => ({
    date: record.date,
    value: record.status === 'Present' ? 1 : 0,
    index: index + 1
  })) || [];

  const stats = attendance ? {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'Present').length,
    percentage: attendance.length > 0 
      ? Math.round((attendance.filter(a => a.status === 'Present').length / attendance.length) * 100)
      : 0
  } : { total: 0, present: 0, percentage: 0 };

  const handleStatusChange = async (recordId, newStatus) => {
    try {
      await attendanceAPI.update(recordId, { status: newStatus });
      refetch();
      setEditingId(null);
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

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
          <div className="card">
            <div className="card-body">
              <h2 className="subject-core mb-2">{subject?.name}</h2>
              <p className="text-muted mb-3">{subject?.code}</p>
              
              <div className="row text-center">
                <div className="col-4">
                  <div className="fs-3 fw-bold text-primary">{stats.present}</div>
                  <small className="text-muted">Attended</small>
                </div>
                <div className="col-4">
                  <div className="fs-3 fw-bold">{stats.total}</div>
                  <small className="text-muted">Total Classes</small>
                </div>
                <div className="col-4">
                  <div className={`fs-3 fw-bold ${stats.percentage >= 75 ? 'text-success' : stats.percentage >= 70 ? 'text-warning' : 'text-danger'}`}>
                    {stats.percentage}%
                  </div>
                  <small className="text-muted">Attendance</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {attendanceData.length > 0 && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">📈 Attendance Trend</h6>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceData}>
                    <XAxis dataKey="index" tick={{ fill: '#A0A0A0', fontSize: 12 }} />
                    <YAxis domain={[0, 1]} tick={{ fill: '#A0A0A0', fontSize: 12 }} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#FF9000" 
                      strokeWidth={2}
                      dot={{ fill: '#FF9000', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">📋 Attendance History</h6>
            </div>
            <div className="card-body p-0">
              {attendance && attendance.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-dark table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((record) => (
                        <tr key={record.id}>
                          <td>{formatDate(record.date)}</td>
                          <td>
                            {editingId === record.id ? (
                              <select 
                                className="form-select form-select-sm"
                                value={record.status}
                                onChange={(e) => handleStatusChange(record.id, e.target.value)}
                              >
                                <option value="Present">✅ Present</option>
                                <option value="Absent">❌ Absent</option>
                              </select>
                            ) : (
                              <span className={record.status === 'Present' ? 'text-success' : 'text-danger'}>
                                {record.status === 'Present' ? '✅ Present' : '❌ Absent'}
                              </span>
                            )}
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setEditingId(editingId === record.id ? null : record.id)}
                            >
                              {editingId === record.id ? 'Cancel' : 'Edit'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="card-body text-center py-4">
                  <p className="text-muted mb-0">No attendance records found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;