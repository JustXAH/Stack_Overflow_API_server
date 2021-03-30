'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    getAllCategories,
    getCategoryById,
    getAllPostsByCategoryId,
    createNewCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categories_controller');


router.get('/', getAllCategories);
router.get('/:category_id', getCategoryById);
router.get('/:category_id/posts', getAllPostsByCategoryId);

router.post('/', verifyToken, validation.createCategorySchema, createNewCategory);

router.patch('/:category_id', verifyToken, validation.updatePostDataSchema, updateCategory);

router.delete('/:category_id', verifyToken, deleteCategory);

module.exports = router;