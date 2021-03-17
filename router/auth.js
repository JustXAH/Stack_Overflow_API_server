'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    register,
    email_confirmation,
    login,
    logout,
    forgotPassword,
    passwordResetForm,
    resetPassword,
} = require('../controllers/auth_controller');

router.get('/register/email-confirm/:confirm_token', email_confirmation);
router.post('/register', validation.registerDataSchema, register);
router.post('/login', validation.loginDataSchema, login);
router.post('/logout', verifyToken, logout);
router.post('/password-reset', validation.forgotPassDataSchema, forgotPassword);
router.get('/password-reset/:reset_token', passwordResetForm);
router.post('/password-reset/:reset_token', validation.resetPassDataSchema, resetPassword);

// router.post('/test', registerValidSchema, test);

module.exports = router;