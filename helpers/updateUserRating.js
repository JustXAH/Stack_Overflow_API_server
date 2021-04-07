const { User, Post, Comment } = require('../models');
const sequelize = require('sequelize');

module.exports = async function updateUserRating(userById) {
    let userRating = 0;

    const UserPostRatings = await Post.findAll({
        where: { author_id: userById.id },
        attributes: [
            'rating',
            [sequelize.fn('sum', sequelize.col('rating')), 'total'],
        ],
        group: ['Post.id'],
        raw: true,
    });

    const UserCommentRatings = await Comment.findAll({
        where: { author_id: userById.id },
        attributes: [
            'rating',
            [ sequelize.fn('sum', sequelize.col('rating')), 'total' ],
        ],
        group: ['Comment.id'],
        raw: true,
    });

    UserPostRatings.forEach((post) => {
        userRating = post.rating + userRating;
    })
    UserCommentRatings.forEach((comment) => {
        userRating = comment.rating + userRating;
    })

    userById.rating = userRating;

    await User.update({
        rating: userRating
    }, { where: { id: userById.id } });
}
