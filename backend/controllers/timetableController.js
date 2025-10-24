const { db } = require('../database');

const getTimetable = (req, res) => {
  const query = `
    SELECT 
      t.*,
      s.name as subject_name,
      s.code as subject_code,
      s.type as subject_type
    FROM timetable t
    JOIN subjects s ON t.subject_id = s.id
    ORDER BY t.day_of_week, t.start_time
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: rows });
  });
};

const getTodayClasses = (req, res) => {
  const today = new Date().getDay();
  
  const query = `
    SELECT 
      t.*,
      s.name as subject_name,
      s.code as subject_code,
      s.type as subject_type
    FROM timetable t
    JOIN subjects s ON t.subject_id = s.id
    WHERE t.day_of_week = ?
    ORDER BY t.start_time
  `;
  
  db.all(query, [today], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: rows });
  });
};

const createTimetableEntry = (req, res) => {
  const { subject_id, day_of_week, start_time, end_time } = req.body;
  
  db.run(
    'INSERT INTO timetable (subject_id, day_of_week, start_time, end_time) VALUES (?, ?, ?, ?)',
    [subject_id, day_of_week, start_time, end_time],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.status(201).json({
        success: true,
        message: 'Timetable entry created successfully',
        data: { id: this.lastID }
      });
    }
  );
};

module.exports = { getTimetable, getTodayClasses, createTimetableEntry };