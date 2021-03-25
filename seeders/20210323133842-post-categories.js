'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PostCategories', [
      {
        post_id: 1,
        category_id: 2,
      },
      {
        post_id: 1,
        category_id: 3,
      },
      {
        post_id: 1,
        category_id: 4,
      },
      {
        post_id: 2,
        category_id: 2,
      },
      {
        post_id: 2,
        category_id: 8,
      },
      {
        post_id: 2,
        category_id: 9,
      },
      {
        post_id: 2,
        category_id: 10,
      },
      {
        post_id: 3,
        category_id: 10,
      },
      {
        post_id: 3,
        category_id: 9,
      },
      {
        post_id: 4,
        category_id: 6,
      },
      {
        post_id: 4,
        category_id: 7,
      },
      {
        post_id: 4,
        category_id: 5,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PostCategories', null, {});
  }
};
