async function emailConfirmMessage(recipient, fullName, confirm_token) {
    return {
        to: recipient,
        subject: 'Confirm your email address on Ucode Stack Overflow',
        html: `<h3>Congratulations, you have successfully registered on the Ucode Stack Overflow!</h3>` +
            `<p>Dear ${fullName},</p>` +
            `<p>Thank you for creating your Ucode Stack Overflow Account</p>` +
            `<p>To complete your registration, click the link below:</p>` +
            `<a href="http://localhost:3000/api/auth/register/email-confirm/${confirm_token}">Confirm your account</a>`
    }
}

async function resetPasswordMessage(recipient, fullName, reset_token) {
    return {
        to: recipient,
        subject: 'Reset password on Ucode Stack Overflow',
        html: `<h3>Hi ${fullName},</h3>` +
            `<p>You're receiving this email because you requested a password ` +
            `reset for your Ucode Stack Overflow Account. <br>` +
            `If you did not request this change, you can safely ignore this email.</p>` +
            `<p>To choose a new password and complete your request, please ` +
            `follow the link below:</p>` +
            `<a href="http://localhost:3000/api/auth/password-reset/${reset_token}">Password reset</a>` +
            `<p>Thank you.</p>` +
            `<p>Ucode Stack Overflow Service</p>`
    }
}

module.exports = { emailConfirmMessage, resetPasswordMessage }