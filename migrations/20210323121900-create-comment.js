'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id"
        // }
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Posts",
        //   key: "id"
        // }
      },
      // publish_date: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      //   defaultValue: Sequelize.NOW
      // },
      content: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now())
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(Date.now())
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};