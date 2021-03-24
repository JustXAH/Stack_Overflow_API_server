'use strict';

const { User } = require('../models');
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

async function register(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })
        const userByLogin = await User.findOne({ where: {login: req.body.login } })
        if (userByLogin)
            return res.status(403).json({
                status: "error",
                message: "User with this login already exists"
            })
        const userByEmail = await User.findOne({ where: {email: req.body.email} })
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
        res.status(200).json({
            status: "success",
            message: "User registered successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function email_confirmation(req, res) {
    try {
        const userByConfirmLink = await User.findOne({where: {confirm_token: req.params.confirm_token}})

        if (userByConfirmLink) {
            if (userByConfirmLink.email_confirmed === true)
                return res.status(403).json({
                    status: "error",
                    message: "Email already confirmed"
                });
            await User.update({ email_confirmed: true },
                {where: {id: userByConfirmLink.id}});
            res.status(200).json({
                status: "success",
                message: "Email confirmed successfully"
            });
        } else {
            res.status(404).json({
                status: "error",
                message: "Incorrect confirmation link"
            });
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function login(req, res) {
    try {
        const errors = validationResult(req).formatWith(loginFailures);
        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const user = await User.findOne({where: {email: req.body.email}})
        if (!user)
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Email not found"
            });
        if (user.login !== req.body.login)
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Incorrect login"
            });
        if (user.email_confirmed === false)
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Email not yet confirmed"
            });
        if (await comparingHashPasswords(req.body.password, user.password) === false)
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Password doesn't match"
            });
        const token = await JwtTokenCreator(user.id);
        res.status(200).json({ status: "success", token: token });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function logout(req, res) {
    try {
        res.status(200).json({
            status: "success",
            message: "User have been logged out"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function forgotPassword(req, res) {
    try {
        const errors = validationResult(req).formatWith(forgotPassFailures);
        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const user = await User.findOne({where: {email: req.body.email}});
        // console.log(user)
        if (!user) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Email not found"
            });
        } else if (user.email_confirmed === false) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden! Email not yet confirmed"
            });
        } else {
            const resetToken = await randomTokenCreator();
            await User.update({
                reset_token: resetToken.token,
                reset_token_expiresAt: resetToken.expiresAt
            }, {
                where: {id: user.id}
            });
            sendMail(await resetPasswordMessage(user.email, user.full_name, resetToken.token));
            res.status(200).json({
                status: "success",
                message: "The letter has been sent. Check your email"
            });
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function passwordResetForm(req, res) {
    res.status(200).send(`
<div>
    <form method="post" action="http://localhost:3000/api/auth/password-reset/${req.params.reset_token}">
    <input placeholder="New password" name="password" value="">
    <button type="submit">submit</button>
    </form>
</div>`)
}

async function resetPassword(req, res) {
    try {
        const user = await User.findOne({where: {reset_token: req.params.reset_token}});
        if (!user)
            return res.status(403).json({
                status: "error",
                message: "Invalid reset token"
            })
        if (user.reset_token_expiresAt < new Date(Date.now()))
            return res.status(403).json({
                status: "error",
                message: "Reset token expired"
            })

        const errors = validationResult(req).formatWith(resetPassFailures);
        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const newHashPassword = await passwordHashing(req.body.password);
        await User.update({
            password: newHashPassword
        }, {
            where: {id: user.id}
        });
        res.status(200).json({
            status: "success",
            message: "Password reset successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

module.exports = {
    register,
    email_confirmation,
    login,
    logout,
    forgotPassword,
    passwordResetForm,
    resetPassword
};