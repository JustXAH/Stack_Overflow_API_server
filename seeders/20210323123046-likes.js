'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Likes', [
            {
                author_id: 2,
                post_id: 1,
                type: 'like',
            },
            {
                author_id: 2,
                comment_id: 1,
                type: 'like',
            },
            {
                author_id: 1,
                comment_id: 1,
                type: 'like',
            },
            {
                author_id: 3,
                comment_id: 1,
                type: 'like',
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Likes', null, {});
    }
};
