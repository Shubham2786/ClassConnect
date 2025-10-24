const express = require('express');
const router = express.Router();
const { validateSubject } = require('../middleware/validation');
const { getAllSubjects, createSubject, updateSubject, deleteSubject } = require('../controllers/subjectController');

router.get('/', getAllSubjects);
router.post('/', validateSubject, createSubject);
router.put('/:id', validateSubject, updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router;