'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategory extends Model {
    static associate(models) {
      PostCategory.belongsTo(models.Post);
      // PostCategory.belongsTo(models.Post, {foreignKey: 'post_id'});
      PostCategory.belongsTo(models.Category);
      // PostCategory.belongsTo(models.Category, {foreignKey: 'category_id'});
    }
  };
  PostCategory.init({
    // id: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'PostCategory',
    timestamps: false
  });
  return PostCategory;
};