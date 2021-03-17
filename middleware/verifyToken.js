const jwt  = require('jsonwebtoken');
const User = require('../sequlize').User;

module.exports = function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY,  async (err, payload) => {
            if (err) {
                return res.status(401).json({
                    status: "Authorization error",
                    message: "Invalid token or token expired"
                });
            } else {
                const user = await User.findOne({
                    attributes: ["login", "full_name", "email", "avatar", "rating", "role"],
                    where: {id: payload.id}
                });
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).json({
            status: "Authorization error",
            message: "No content in 'Authorization' header"
        });
    }
}