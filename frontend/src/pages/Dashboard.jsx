import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { attendanceAPI, timetableAPI } from '../services/api';
import QuickAttendanceCard from '../components/QuickAttendanceCard';
import AttendanceOverview from '../components/AttendanceOverview';
import TodayClasses from '../components/TodayClasses';

const Dashboard = () => {
  const [markedClasses, setMarkedClasses] = useState(new Set());
  const { data: attendanceStats, loading: statsLoading, refetch: refetchStats } = useFetch(attendanceAPI.getStats);
  const { data: todayClasses, loading: classesLoading } = useFetch(timetableAPI.getToday);
  
  const availableClasses = todayClasses?.filter(cls => !markedClasses.has(cls.id)) || [];
  
  const handleRemoveClass = (classId) => {
    setMarkedClasses(prev => new Set([...prev, classId]));
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (statsLoading || classesLoading) {
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
      {/* Welcome Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-1">Welcome back! 👋</h2>
              <p className="text-muted mb-0">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Quick Attendance */}
        <div className="col-lg-7">
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">⚡ Quick Attendance</h5>
              <small className="text-muted">Mark attendance for today's classes</small>
            </div>
            {availableClasses.map((classItem) => (
              <div key={classItem.id} className="col-md-6 mb-3">
                <QuickAttendanceCard 
                  classItem={classItem}
                  onMarkAttendance={refetchStats}
                  onRemove={handleRemoveClass}
                />
              </div>
            ))}
            {availableClasses.length === 0 && todayClasses?.length > 0 && (
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center py-4">
                    <h6 className="text-success mb-2">✅ All Done!</h6>
                    <p className="text-muted mb-0">You've marked attendance for all today's classes.</p>
                  </div>
                </div>
              </div>
            )}
            {(!todayClasses || todayClasses.length === 0) && (
              <div className="col-12">
                <div className="card">
                  <div className="card-body text-center py-4">
                    <p className="text-muted mb-0">No classes scheduled for today.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Today's Classes & Chart */}
        <div className="col-lg-5">
          <div className="mb-4">
            <TodayClasses classes={todayClasses} />
          </div>
          
          {attendanceStats && attendanceStats.length > 0 && (
            <AttendanceOverview data={attendanceStats} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;