'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {foreignKey: 'author_id'});
      User.hasMany(models.Comment, {foreignKey: 'author_id'});
      User.hasMany(models.Like, {foreignKey: 'author_id'});
      // User.belongsTo(models.Comment, {foreignKey: 'author'});
      // User.hasMany(models.Post, {
      //   foreignKey: 'author',
      //   as: 'Posts'
      // });
      // User.hasMany(models.Comment, {
      //   onDelete: 'CASCADE'
      // });
    }
  }

  User.init({
    // id: {
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    login: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    confirm_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    email_confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reset_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    reset_token_expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};