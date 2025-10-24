import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AttendanceChart = ({ data }) => {
  const chartData = data?.map(subject => ({
    name: subject.code,
    percentage: subject.total_classes > 0 
      ? Math.round((subject.present_count / subject.total_classes) * 100) 
      : 0,
    present: subject.present_count || 0,
    total: subject.total_classes || 0
  })) || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="card p-2 border-0 shadow">
          <p className="mb-1 fw-bold">{label}</p>
          <p className="mb-1 text-success">Present: {data.present}</p>
          <p className="mb-1 text-muted">Total: {data.total}</p>
          <p className="mb-0 fw-bold">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h6 className="mb-0">📊 Attendance Overview</h6>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              fill="#ffa31a"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;