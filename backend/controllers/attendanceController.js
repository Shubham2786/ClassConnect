const { db } = require('../database');

const getAttendanceStats = (req, res) => {
  const query = `
    SELECT 
      s.id,
      s.name,
      s.code,
      COUNT(a.id) as total_classes,
      SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as present_count,
      ROUND(
        (SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(a.id)), 2
      ) as percentage
    FROM subjects s
    LEFT JOIN attendance a ON s.id = a.subject_id
    GROUP BY s.id, s.name, s.code
    ORDER BY s.name
  `;
  
  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: rows });
  });
};

const getSubjectAttendance = (req, res) => {
  const { id } = req.params;
  
  db.all(
    'SELECT * FROM attendance WHERE subject_id = ? ORDER BY date DESC',
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({ success: true, data: rows });
    }
  );
};

const markAttendance = (req, res) => {
  const { subject_id, date, status } = req.body;
  
  db.run(
    'INSERT OR REPLACE INTO attendance (subject_id, date, status) VALUES (?, ?, ?)',
    [subject_id, date, status],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.json({
        success: true,
        message: 'Attendance marked successfully',
        data: { id: this.lastID }
      });
    }
  );
};

const updateAttendance = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run(
    'UPDATE attendance SET status = ? WHERE id = ?',
    [status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: 'Attendance record not found' });
      }
      res.json({ success: true, message: 'Attendance updated successfully' });
    }
  );
};

module.exports = { getAttendanceStats, getSubjectAttendance, markAttendance, updateAttendance };