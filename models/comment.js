'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: 'author_id'} );
      Comment.belongsTo(models.Post, { foreignKey: 'post_id' });
      Comment.hasMany(models.Like, { onDelete: 'CASCADE', foreignKey: 'comment_id' });
    }
  }
  Comment.init({
    // id: {
    //   primaryKey: true,
    //   autoIncrement: true,
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};