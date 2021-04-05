'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: 'author_id' });
      Like.belongsTo(models.Post, { foreignKey: 'post_id' });
      Like.belongsTo(models.Comment, { onDelete: 'CASCADE', foreignKey: 'comment_id' });
    }
  };
  Like.init({
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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