'use strict';

const { User } = require('../models');
const { validationResult } = require('express-validator');
const { registrationFailures } = require('../helpers/errorsOutputFormat');
const { emailConfirmMessage } = require('../helpers/mailCreators');
const sendMail = require('../helpers/sendMail');
const deletePrevAvatar = require('../helpers/deletePrevAvatar');
const {
    passwordHashing,
    comparingHashPasswords,
    randomTokenCreator,
} = require('../helpers/helpers');


async function getAllUsers(req, res) {
    try {
        const allUsers = await User.findAll({
            attributes: ["id", "login", "full_name", "email", "avatar", "rating", "role"]
        })
        if (!allUsers)
            res.status(500).json({
                status: "error",
                message: "Unrecognized database error"
            })
        else {
            res.status(200).json({ status: "success", data: allUsers })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getUserById(req, res) {
    try {
        const userById = await User.findByPk(req.params.user_id,{
            attributes: ["id", "login", "full_name", "email", "avatar", "rating", "role", "createdAt", "updatedAt"],
        })
        if (!userById)
            return res.status(404).json({
                status: "error",
                message: "User not found by requested param - user ID"
            })
        else {
            res.status(200).json({ status: "success", data: userById })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewUser(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })
        if (req.user.role !== "admin")
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Access is allowed only to the admin"
            })
        const userByLogin = await User.findOne({ where: { login: req.body.login } })
        if (userByLogin)
            return res.status(403).json({
                status: "error",
                message: "User with this login already exists"
            })
        const userByEmail = await User.findOne({ where: { email: req.body.email } })
        if (userByEmail)
            return res.status(403).json({
                status: "error",
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
        res.status(201).json({
            status: "success",
            message: "New user created successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function avatarUpload(req, res) {
    try {
        if (req.errorCode === 400)
            return res.status(400).json({
                status: "error",
                message: "Incorrect format of the uploaded file. Not an image"
            })
        if (!req.file)
            return res.status(400).json({
                status: "error",
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
            status: "success",
            avatar: req.file.filename
        })
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function updateUserData(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })
        }
        if (req.user.id !== Number(req.params.user_id) && req.user.role !== "admin")
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Only the admin can change the data of other users"
            })
        const userById = await User.findByPk(req.params.user_id)
        if (!userById)
            return res.status(404).json({
                status: "error",
                message: "User not found by requested param - user ID"
            })
        if (req.body.login !== userById.login
            && await User.findOne({ where: {login: req.body.login } })!== null) {
            return res.status(403).json({
                status: "error",
                message: "Login is already taken"
            })
        }
        if (req.body.email !== userById.email
            && await User.findOne({ where: { email: req.body.email } })!== null) {
            return res.status(403).json({
                status: "error",
                message: "Email is already taken"
            })
        }
        let hashPassword;
        if (req.body.password === undefined) {
            hashPassword = userById.password;
        }
        else if (await comparingHashPasswords(req.body.password, userById.password) === false) {
            hashPassword = await passwordHashing(req.body.password);
        } else {
                hashPassword = userById.password;
            }
        let confirm_token;
        let emailConfirmed;
        if (req.body.email !== userById.email) {
            confirm_token = await randomTokenCreator();
            emailConfirmed = false;
            sendMail(await emailConfirmMessage(req.body.email, req.body.full_name, confirm_token.token));
        } else {
            confirm_token = userById.confirm_token;
            emailConfirmed = userById.email_confirmed;
        }
        await User.update({
            login: req.body.login,
            password: hashPassword,
            full_name: req.body.full_name,
            email: req.body.email,
            confirm_token: confirm_token.token,
            email_confirmed: emailConfirmed
        }, {
            where: { id: req.params.user_id }
        });
        res.status(200).json({
            status: "success",
            message: 'Updated user data successfully'
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deleteUser(req, res) {
    try {
       if (req.user.id !== Number(req.params.user_id) && req.user.role !== "admin")
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Only the admin can change the data of other users"
            })
        const user = await User.findByPk(req.params.user_id);
        if (!user)
            return res.status(404).json({
                status: "error",
                message: "User not found by requested param - user ID"
            })
        await user.destroy();
        res.status(200).json({
            status: "success",
            message: 'User deleted successfully'
        })
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
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