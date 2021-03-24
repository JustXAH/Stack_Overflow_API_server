'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, {foreignKey: 'author_id'});
      Like.belongsTo(models.Post, {foreignKey: 'post_id'});
      Like.belongsTo(models.Comment, {foreignKey: 'comment_id'});
    }
  };
  Like.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // publish_date: DataTypes.DATE,
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};