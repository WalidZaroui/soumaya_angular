const express = require('express');
const lessonController = require('../controllers/lesson');
const router = express.Router();

router.get('/lessons', lessonController.getLessons);
router.get('/lesson/course/:course', lessonController.getLessonsByCourse);
router.get('/lesson/:id', lessonController.getLesson);
router.post('/lesson', lessonController.createLesson);
router.put('/lesson', lessonController.updateLesson);
router.delete('/lesson/:id', lessonController.deleteLesson);


module.exports = router;
