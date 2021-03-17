const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/user");
const db = require('./models/index');

(async () => await db.sequelize.sync())();

const User = UserModel(db.sequelize, DataTypes);

module.exports = { User };