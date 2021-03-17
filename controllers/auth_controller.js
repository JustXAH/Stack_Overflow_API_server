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

async function register(req, res) {
    try {
        const errors = validationResult(req).formatWith(registrationFailures);
        if (!errors.isEmpty())
            res.status(400).json(errors.array())
        else {
            const userByLogin = await User.findOne( { where: { login: req.body.login } })
            if (userByLogin)
                res.status(400).json({
                    register: false,
                    message: "User with this login already exists"
                })
            const userByEmail = await User.findOne({ where: { email: req.body.email } })
            if (userByEmail)
                res.status(400).json({
                    register: false,
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
                register: true,
                message: "User registered successfully"
            });
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function email_confirmation(req, res) {
    const userByConfirmLink = await User.findOne( { where: { confirm_token: req.params.confirm_token }})

    if (userByConfirmLink) {
        if (userByConfirmLink.email_confirmed === true)
            res.status(403).json({
                confirm: false,
                message: "Email already confirmed"
            });
        else {
            await User.update( { email_confirmed: true},
                { where: { id: userByConfirmLink.id } });
            res.status(200).json({
                confirm: true,
                message: "Email confirmed successfully"
            });
        }
    } else {
        res.status(404).json({
            confirm: false,
            message: "Incorrect confirmation link"
        });
    }
}

async function login(req, res) {
    try {
        const errors = validationResult(req).formatWith(loginFailures);
        if (!errors.isEmpty())
            res.status(400).json(errors.array())
        else {
            const user = await User.findOne({where: {email: req.body.email}})
            if (!user) {
                res.status(403).json({
                    auth: false,
                    message: "Forbidden! Email not found"
                });
            } else {
                if (user.email_confirmed === false)
                    res.status(403).json({
                        auth: false,
                        message: "Forbidden! Email not yet confirmed"
                    });
                else if (user.login !== req.body.login)
                    res.status(403).json({
                        auth: false,
                        message: "Forbidden! Incorrect login"
                    });
                else if (await comparingHashPasswords(req.body.password, user.password) === false)
                    res.status(403).json({
                        auth: false,
                        message: "Forbidden! Password doesn't match"
                    });
                else {
                    const token = await JwtTokenCreator(user.id);
                    res.status(200).json({auth: true, token: token});
                }
            }
        }
    } catch (err) {
        res.status(500).json({error: err});
    }
}

async function logout(req, res) {
    res.status(200).json({
        logout: true,
        message: "User have been logged out"
    });
}

async function forgotPassword(req, res) {
    try {
        const errors = validationResult(req).formatWith(forgotPassFailures);
        if (!errors.isEmpty())
            res.status(400).json(errors.array())
        else {
            const user = await User.findOne({ where: { email: req.body.email} });
            // console.log(user)
            if (!user) {
                res.status(403).json({
                    resetLinkSent: false,
                    message: "Forbidden! Email not found"
                });
            } else {
                if (user.email_confirmed === false) {
                    res.status(403).json({
                        auth: false,
                        message: "Forbidden! Email not yet confirmed"
                    });
                }
                else {
                    const resetToken = await randomTokenCreator();
                    await User.update({
                        reset_token: resetToken.token,
                        reset_token_expiresAt: resetToken.expiresAt
                    }, {
                        where: {id: user.id}
                    });

                    sendMail(await resetPasswordMessage(user.email, user.full_name, resetToken.token));
                    res.status(200).json({
                        resetLinkSent: true,
                        message: "The letter has been sent. Check your email"
                    });
                }
            }
        }
    } catch (err) {
        res.status(500).json({error: err});
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
        const user = await User.findOne( { where: { reset_token: req.params.reset_token}});
        const errors = validationResult(req).formatWith(resetPassFailures);
        if (!user)
            res.status(403).json({
                reset_password: false,
                message: "Invalid reset token"
            })
        else if (user.reset_token_expiresAt < new Date(Date.now()))
            res.status(403).json({
                reset_password: false,
                message: "Reset token expired"
            })
        else if (!errors.isEmpty())
            res.status(400).json(errors.array())
        else {
            const newHashPassword = await passwordHashing(req.body.password);
            await User.update({
                password: newHashPassword
            }, {
                where: {id: user.id}
            });
            res.status(200).json({
                resetPassword: true,
                message: "Password reset successfully"
            });
        }
    } catch (err) {
        res.status(500).json({error: err});
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