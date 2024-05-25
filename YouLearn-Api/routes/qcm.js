const express = require('express');
const qcmController = require('../controllers/qcm');
const router = express.Router();

router.get('/qcm/:id', qcmController.getQcm);
router.get('/qcm', qcmController.getAll);
router.get('/qcm/lesson/:lesson', qcmController.getQcmByLesson);
router.post('/qcm', qcmController.createQcm);
router.put('/qcm', qcmController.updateQcm);
router.delete('/qcm/:id', qcmController.deleteQcm);


module.exports = router;
