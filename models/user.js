'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User.hasMany(models.Post, {as: })
    }
  }

  User.init({
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    role: DataTypes.ENUM('user', 'admin'),
    token: DataTypes.STRING,
    confirm_token: DataTypes.STRING,
    email_confirmed: DataTypes.BOOLEAN,
    reset_token: DataTypes.STRING,
    reset_token_expiresAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};