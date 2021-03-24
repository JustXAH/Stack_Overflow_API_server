'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id"
        // }
      },
      title: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      // publish_date: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      //   defaultValue: Sequelize.NOW
      // },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },
      content: {
        type: Sequelize.STRING(1234),
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      // categories: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "Categories",
      //     key: "id"
      //   }
      // },
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
    await queryInterface.dropTable('Posts');
  }
};