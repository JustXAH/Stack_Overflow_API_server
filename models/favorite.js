'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User);
      Favorite.belongsTo(models.Post);
    }
  };
  Favorite.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};