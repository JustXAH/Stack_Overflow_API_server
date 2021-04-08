const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
        host: process.env.USOF_EMAIL_HOST,
        port: process.env.USOF_EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.USOF_EMAIL,
            pass: process.env.USOF_EMAIL_PASSWORD
        }
    },
    {
        from: `Ucode Stack Overflow <${process.env.USOF_EMAIL}>`,
    })

module.exports = (message) => {
    transporter.sendMail(message,(err, info) => {
        if(err) return console.log(err)
    })
}