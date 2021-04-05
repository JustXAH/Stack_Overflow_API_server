'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    getAllPosts,
    getAllFavoritePosts,
    getPostById,
    getAllCommentsByPostId,
    getAllCategoriesByPostId,
    getAllLikesByPostId,
    createNewPost,
    addPostToFavorite,
    createNewComment,
    createNewPostLike,
    updatePost,
    deletePost,
    deletePostFromFavorites,
    deleteLike
} = require('../controllers/posts_controller');

router.get('/', getAllPosts);
router.get('/favorite', verifyToken, getAllFavoritePosts);
router.get('/:post_id', getPostById);
router.get('/:post_id/comments', getAllCommentsByPostId);
router.get('/:post_id/categories', verifyToken, getAllCategoriesByPostId);
router.get('/:post_id/like', verifyToken, getAllLikesByPostId);

router.post('/', verifyToken, validation.createPostDataSchema, createNewPost);
router.post('/:post_id/favorite', verifyToken, addPostToFavorite);
router.post('/:post_id/comments', verifyToken, validation.commentDataSchema, createNewComment);
router.post('/:post_id/like', verifyToken, validation.likeDataSchema, createNewPostLike);

router.patch('/:post_id', verifyToken, validation.updatePostDataSchema, updatePost);

router.delete('/:post_id', verifyToken, deletePost);
router.delete('/:post_id/favorite', verifyToken, deletePostFromFavorites);
router.delete('/:post_id/like', verifyToken, validation.likeDataSchema, deleteLike);

module.exports = router;