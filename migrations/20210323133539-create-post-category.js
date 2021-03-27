'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Posts",
        //   key: "id",
        //   onDelete: "CASCADE"
        // }
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Categories",
        //   key: "id",
        //   onDelete: "CASCADE"
        // }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};