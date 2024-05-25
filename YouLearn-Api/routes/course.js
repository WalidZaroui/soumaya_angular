const express = require('express');
const courseController = require('../controllers/course');
const router = express.Router();

router.get('/courses', courseController.getCourses);
router.get('/courses/publisher', courseController.getUserCourses);
router.get('/course/:id', courseController.getCourse);
router.get('/course/buy/:id', courseController.buyCourse);
router.get('/courses/:category', courseController.getCoursesByCategory);
router.post('/course', courseController.createCourse);
router.put('/course', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);


module.exports = router;
