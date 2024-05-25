const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/users', userController.getUsers);
router.get('/user', userController.getUser);
router.put('/user', userController.updateUser);
router.post('/user', userController.createUser);
router.delete('/user/:id', userController.deleteUser);
router.post('/login', userController.login);
router.post('/file', userController.file);


module.exports = router;
