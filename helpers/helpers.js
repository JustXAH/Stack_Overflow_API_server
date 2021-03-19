const crypto = require('crypto');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function passwordHashing(password) {
    return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
}

async function comparingHashPasswords(req_password, user_password) {
    return bcrypt.compareSync(req_password, user_password)
}

async function randomTokenCreator() {
    return {
        token: crypto.randomBytes(40).toString('hex'),
        expiresAt: new Date(Date.now() + 24*60*60*1000) // 24 hours
        // expiresAt: new Date(Date.now() + 30*1000) // 30 sec
    };
}

async function JwtTokenCreator(user_id) {
    return jwt.sign({ id: user_id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

module.exports = {
    passwordHashing,
    comparingHashPasswords,
    randomTokenCreator,
    JwtTokenCreator
}