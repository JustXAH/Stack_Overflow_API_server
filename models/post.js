'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Post.belongsTo(models.User, {foreignKey: 'author', as: ''})
    }
  }
  Post.init({
    author: DataTypes.INTEGER,
    title: DataTypes.STRING,
    // publish_date: DataTypes.DATE,
    status: DataTypes.ENUM('active', 'inactive'),
    content: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    // categories: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};