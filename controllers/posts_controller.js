'use strict';

const User = require('../sequlize').User;
const { validationResult } = require('express-validator');
const { registrationFailures } = require('../helpers/errorsOutputFormat')
const { emailConfirmMessage } = require('../helpers/mailCreators');
const sendMail = require('../helpers/sendMail');
const deletePrevAvatar = require('../helpers/deletePrevAvatar')
const {
    passwordHashing,
    comparingHashPasswords,
    randomTokenCreator,
    JwtTokenCreator
} = require('../helpers/helpers')

async function getAllPosts(req, res) {

}

module.exports = {
    getAllPosts,
};