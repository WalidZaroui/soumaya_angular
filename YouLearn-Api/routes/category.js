const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategory);
router.put('/category', categoryController.updateCategory);
router.post('/category', categoryController.createCategory);
router.delete('/category/:id', categoryController.deleteCategory);


module.exports = router;
