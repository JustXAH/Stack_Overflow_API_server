const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/user");
const CategoryModel = require("./models/category");
const PostModel = require("./models/post");
const PostCategoryModel = require("./models/postcategory");
const db = require('./models/index');

(async () => await db.sequelize.sync())();

const User = UserModel(db.sequelize, DataTypes);
const Category = CategoryModel(db.sequelize, DataTypes);
const Post = PostModel(db.sequelize, DataTypes);
const PostCategory = PostCategoryModel(db.sequelize, DataTypes);

module.exports = { User, Category, Post, PostCategory };