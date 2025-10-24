const { db } = require('../database');

const getAllSubjects = (req, res) => {
  db.all('SELECT * FROM subjects ORDER BY created_at DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    res.json({ success: true, data: rows });
  });
};

const createSubject = (req, res) => {
  const { name, code, type, credits = 3 } = req.body;
  
  db.run(
    'INSERT INTO subjects (name, code, type, credits) VALUES (?, ?, ?, ?)',
    [name, code, type, credits],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      res.status(201).json({
        success: true,
        message: 'Subject created successfully',
        data: { id: this.lastID }
      });
    }
  );
};

const updateSubject = (req, res) => {
  const { id } = req.params;
  const { name, code, type, credits } = req.body;
  
  db.run(
    'UPDATE subjects SET name = ?, code = ?, type = ?, credits = ? WHERE id = ?',
    [name, code, type, credits, id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ success: false, message: 'Subject not found' });
      }
      res.json({ success: true, message: 'Subject updated successfully' });
    }
  );
};

const deleteSubject = (req, res) => {
  const { id } = req.params;
  
  db.run('DELETE FROM subjects WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }
    res.json({ success: true, message: 'Subject deleted successfully' });
  });
};

module.exports = { getAllSubjects, createSubject, updateSubject, deleteSubject };