'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Likes', [
            {
                author_id: 3,
                post_id: 1,
                type: 'like',
            },
            {
                author_id: 4,
                post_id: 1,
                type: 'like',
            },
            {
                author_id: 5,
                post_id: 1,
                type: 'like',
            },
            {
                author_id: 2,
                comment_id: 1,
                type: 'like',
            },
            {
                author_id: 4,
                comment_id: 1,
                type: 'like',
            },
            {
                author_id: 3,
                comment_id: 1,
                type: 'like',
            },
            {
                author_id: 5,
                comment_id: 1,
                type: 'dislike',
            },
            {
                author_id: 3,
                post_id: 2,
                type: 'like',
            },
            {
                author_id: 4,
                post_id: 2,
                type: 'like',
            },
            {
                author_id: 2,
                comment_id: 3,
                type: 'like',
            },
            {
                author_id: 6,
                comment_id: 3,
                type: 'like',
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Likes', null, {});
    }
};
