'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const imageUploadHandler = require('../middleware/imageUploadHandler')
const {
    getAllPosts,
} = require('../controllers/posts_controller');

router.get('/', verifyToken, getAllPosts);
// router.get('/:user_id', verifyToken, getUserById);
// router.post('/', verifyToken, validation.registerDataSchema, createNewUser);
// router.post('/avatar', verifyToken, imageUploadHandler, avatarUpload);
// router.patch('/:user_id', verifyToken, validation.updateDataSchema, updateUserData);
// router.delete('/:user_id', verifyToken, deleteUser);

module.exports = router;