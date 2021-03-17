const User = require('../sequlize').User;
const { validationResult } = require('express-validator');
const {
    registrationFailures,
    loginFailures,
    forgotPassFailures,
    resetPassFailures
} = require('../helpers/errorsOutputFormat')

const { emailConfirmMessage, resetPasswordMessage } = require('../helpers/mailCreators');
const sendMail = require('../helpers/sendMail');
const {
    passwordHashing,
    comparingHashPasswords,
    randomTokenCreator,
    JwtTokenCreator
} = require('../helpers/helpers')

async function getAllUsers(req, res) {
    try {
        const allUsers = await User.findAll({
            attributes: ["id", "login", "full_name", "email", "avatar", "rating", "role"]
        })
        if (!allUsers)
            res.status(500).json({
                status: "Database error",
                message: "Unrecognized database error"
            })
        else {
            res.status(201).json(allUsers)
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function getUserById(req, res) {
    try {
        const userById = await User.findByPk(req.params.user_id,{
            attributes: ["id", "login", "full_name", "email", "avatar", "rating", "role"],
        })
        if (!userById)
            res.status(404).json({
                status: "Request error",
                message: "User not found by requested params ID"
            })
        else {
            res.status(201).json(userById)
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

module.exports = {
    getAllUsers,
    getUserById
};