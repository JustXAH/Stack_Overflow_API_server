'use strict';
const { Model } = require('sequelize');
// const { User } = require('../sequlize')


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.hasMany(models.PostCategory, {foreignKey: 'post_id'});
      Post.hasMany(models.Comment, {foreignKey: 'post_id'});
      Post.hasMany(models.Like, {foreignKey: 'post_id'});
      Post.belongsTo(models.User, {foreignKey: 'author_id'});
    }
  }
  Post.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id"
      // }
    },
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