// const User = require('../sequlize').User;
// const {
//     passwordHashing,
//     comparingHashPasswords,
//     randomTokenCreator,
//     JwtTokenCreator
// } = require('../helpers/helpers')
//
// async function updateUser(req, res, user) {
//     if (req.body.login === user.login && (await User.findOne({ where: {email: req.body.email} })) !== null) {
//         return res.status()
//     }
// }