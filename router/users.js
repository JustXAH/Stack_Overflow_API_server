'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    getAllUsers,
    getUserById,
    createNewUser,
    avatarUpload
} = require('../controllers/users_controller');

router.get('/', verifyToken, getAllUsers);
router.get('/:user_id', verifyToken, getUserById);
router.post('/', verifyToken, validation.registerDataSchema, createNewUser);
router.post('/avatar', verifyToken, avatarUpload);
// router.post('/login', validation.loginDataSchema, login);
// router.post('/logout', verifyToken, logout);
// router.post('/password-reset', validation.forgotPassDataSchema, forgotPassword);
// router.get('/password-reset/:reset_token', passwordResetForm);
// router.post('/password-reset/:reset_token', validation.resetPassDataSchema, resetPassword);

// router.post('/test', registerValidSchema, test);

module.exports = router;