'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Favorites', [
      {
        userId: 2,
        postId: 1,
      },
      {
        userId: 2,
        postId: 2,
      },
      {
        userId: 2,
        postId: 4,
      },
      {
        userId: 2,
        postId: 5,
      },
      {
        userId: 1,
        postId: 3,
      },
      {
        userId: 1,
        postId: 4,
      },
      {
        userId: 1,
        postId: 5,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
