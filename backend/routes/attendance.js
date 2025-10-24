const express = require('express');
const router = express.Router();
const { validateAttendance } = require('../middleware/validation');
const { getAttendanceStats, getSubjectAttendance, markAttendance, updateAttendance } = require('../controllers/attendanceController');

router.get('/stats', getAttendanceStats);
router.get('/subject/:id', getSubjectAttendance);
router.post('/', validateAttendance, markAttendance);
router.put('/:id', updateAttendance);

module.exports = router;