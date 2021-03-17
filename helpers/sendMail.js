const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465 ,
        secure: true,
        auth: {
            user: 'usofXAH@gmail.com',
            pass: 'mnymxqqvwnzrfwdz'
        }
    },
    {
        from: 'Ucode Stack Overflow <usofXAH@gmail.com>',
    })

module.exports = (message) => {
    transporter.sendMail(message,(err, info) => {
        if(err) return console.log(err)
    })
}