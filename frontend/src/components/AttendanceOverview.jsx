import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const AttendanceOverview = ({ data, todayAttendance = [] }) => {
  const navigate = useNavigate();
  
  const chartData = data?.map(subject => ({
    id: subject.id,
    name: subject.code,
    fullName: subject.name,
    percentage: subject.total_classes > 0 
      ? Math.round((subject.present_count / subject.total_classes) * 100) 
      : 0,
    present: subject.present_count || 0,
    total: subject.total_classes || 0
  })) || [];

  const getBarColor = (percentage) => {
    if (percentage >= 75) return '#00C853';
    if (percentage >= 70) return '#FFD580';
    return '#FF3B3B';
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/attendance/${subjectId}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">📊 Attendance Overview</h6>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: '#A0A0A0', fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: '#A0A0A0', fontSize: 12 }} />
            <Bar 
              dataKey="percentage" 
              radius={[4, 4, 0, 0]}
              cursor="pointer"
              onClick={(data) => handleSubjectClick(data.id)}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {todayAttendance.length > 0 && (
          <div className="mt-3">
            <small className="text-muted d-block mb-2">Today's Attendance Summary</small>
            <div className="d-flex flex-wrap gap-2">
              {todayAttendance.map((item, index) => (
                <span 
                  key={index}
                  className="badge bg-secondary cursor-pointer"
                  onClick={() => handleSubjectClick(item.subject_id)}
                >
                  {item.status === 'Present' ? '✅' : '❌'} {item.subject_code}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceOverview;