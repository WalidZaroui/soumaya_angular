const express = require('express');
const VideoController = require('../controllers/video');
const router = express.Router();

router.get('/video/:id', VideoController.getVideo);
router.get('/video', VideoController.getAll);
router.get('/video/lesson/:lesson', VideoController.getVideoByLesson);
router.post('/video', VideoController.createVideo);
router.put('/video', VideoController.updateVideo);
router.delete('/video/:id', VideoController.deleteVideo);


module.exports = router;
