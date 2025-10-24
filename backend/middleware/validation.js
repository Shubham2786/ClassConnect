const validateSubject = (req, res, next) => {
  const { name, code, type, credits } = req.body;
  
  if (!name || !code || !type) {
    return res.status(400).json({
      success: false,
      message: 'Name, code, and type are required'
    });
  }
  
  if (!['Theory', 'Lab'].includes(type)) {
    return res.status(400).json({
      success: false,
      message: 'Type must be either Theory or Lab'
    });
  }
  
  if (credits && (credits < 1 || credits > 10)) {
    return res.status(400).json({
      success: false,
      message: 'Credits must be between 1 and 10'
    });
  }
  
  next();
};

const validateAttendance = (req, res, next) => {
  const { subject_id, date, status } = req.body;
  
  if (!subject_id || !date || !status) {
    return res.status(400).json({
      success: false,
      message: 'Subject ID, date, and status are required'
    });
  }
  
  if (!['Present', 'Absent'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be either Present or Absent'
    });
  }
  
  next();
};

const validateTimetable = (req, res, next) => {
  const { subject_id, day_of_week, start_time, end_time } = req.body;
  
  if (!subject_id || day_of_week === undefined || !start_time || !end_time) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  if (day_of_week < 0 || day_of_week > 6) {
    return res.status(400).json({
      success: false,
      message: 'Day of week must be between 0 and 6'
    });
  }
  
  next();
};

module.exports = { validateSubject, validateAttendance, validateTimetable };