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
            res.status(200).json(allUsers)
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
            res.status(200).json(userById)
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function createNewUser(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        if (req.user.role !== "admin")
            return res.status(403).json({
                create_new_user: false,
                message: "Permission denied! Access is allowed only to the admin"
            })
        const userByLogin = await User.findOne({where: {login: req.body.login}})
        if (userByLogin)
            return res.status(403).json({
                create_new_user: false,
                message: "User with this login already exists"
            })
        const userByEmail = await User.findOne({where: {email: req.body.email}})
        if (userByEmail)
            return res.status(403).json({
                create_new_user: false,
                message: "User with this email already exists"
            })
        // Hashing password
        const hashPassword = await passwordHashing(req.body.password);
        // Creating random link for email confirming
        const confirm_token = await randomTokenCreator();
        await User.create({
            login: req.body.login,
            password: hashPassword,
            full_name: req.body.full_name,
            email: req.body.email,
            confirm_token: confirm_token.token
        });
        // Creating a verification message and sending it to the user email
        sendMail(await emailConfirmMessage(req.body.email, req.body.full_name, confirm_token.token));
        res.status(200).json({
            create_new_user: true,
            message: "New user created successfully"
        });
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function avatarUpload(req, res) {
    try {
        // console.log(req.user)
        if (req.errorCode === 400)
            return res.status(400).json({
                avatar_upload: false,
                message: "Incorrect format of the uploaded file. Not an image"
            })
        if (!req.file)
            return res.status(400).json({
                avatar_upload: false,
                message: "Error loading file"
            })
        if (req.user.avatar !== null)
            await deletePrevAvatar(req.user.avatar)
        await User.update({
            avatar: req.file.filename
        }, {
            where: { id: req.user.id }
        });
        res.status(200).json({
            avatar_upload: true,
            avatar: req.file.filename
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function updateUserData(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
        if (req.user.id !== req.params.user_id && req.user.role !== "admin")
            return res.status(403).json({
                update_user_data: false,
                message: "Permission denied! Only the admin can change the data of other users"
            })
        const userById = await User.findByPk(req.params.user_id,{
            attributes: ["id", "login", "full_name", "email", "avatar", "rating", "role"],
        })
        if (!userById)
            return res.status(404).json({
                status: "Request error",
                message: "User not found by requested params ID"
            })
        await User.update({
            login: req.body.login,
            password: hashPassword,
            full_name: req.body.full_name,
            email: req.body.email,
            confirm_token: confirm_token.token
        })
        res.status(200).json({
            update_user_data: true,
            message: 'Updated user data successfully'
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function deleteUser(req, res) {
    try {
        if (req.user.id !== req.params.user_id && req.user.role !== "admin")
            return res.status(403).json({
                delete_user: false,
                message: "Permission denied! Only the admin can change the data of other users"
            })
        const user = await User.findByPk(req.params.user_id);
        await user.destroy();
        res.status(200).json({
            delete_user: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        res.status(500).json({error: err});
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createNewUser,
    avatarUpload,
    updateUserData,
    deleteUser
};