const express = require('express');
const router = express.Router();
const { validateTimetable } = require('../middleware/validation');
const { getTimetable, getTodayClasses, createTimetableEntry } = require('../controllers/timetableController');

router.get('/', getTimetable);
router.get('/today', getTodayClasses);
router.post('/', validateTimetable, createTimetableEntry);

module.exports = router;