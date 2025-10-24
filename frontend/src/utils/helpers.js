export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const getAttendanceColor = (percentage) => {
  if (percentage >= 75) return 'attendance-excellent';
  if (percentage >= 70) return 'attendance-good';
  return 'attendance-poor';
};

export const getDayName = (dayIndex) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex];
};

export const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

export const showToast = (message, type = 'info') => {
  // Simple toast implementation - can be enhanced with a toast library
  console.log(`${type.toUpperCase()}: ${message}`);
};