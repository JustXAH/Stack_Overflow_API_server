'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const imageUploadHandler = require('../middleware/imageUploadHandler')
const {
    getAllUsers,
    getUserById,
    createNewUser,
    avatarUpload,
    updateUserData,
    deleteUser
} = require('../controllers/users_controller');

router.get('/', verifyToken, getAllUsers);
router.get('/:user_id', verifyToken, getUserById);
router.post('/', verifyToken, validation.registerUserDataSchema, createNewUser);
router.post('/avatar', verifyToken, imageUploadHandler, avatarUpload);
router.patch('/:user_id', verifyToken, validation.updateUserDataSchema, updateUserData);
router.delete('/:user_id', verifyToken, deleteUser);

module.exports = router;