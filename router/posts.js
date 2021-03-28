'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    getAllPosts,
    getPostById,
    getAllCommentsByPostId,
    getAllCategoriesByPostId,
    getAllLikesByPostId,
    createNewPost,
    createNewComment,
    createNewLike,
    updatePost,
    deletePost,
    deleteLike
} = require('../controllers/posts_controller');


router.get('/', getAllPosts);
router.get('/:post_id', getPostById);
router.get('/:post_id/comments', getAllCommentsByPostId);
router.get('/:post_id/categories', verifyToken, getAllCategoriesByPostId);
router.get('/:post_id/like', verifyToken, getAllLikesByPostId);

router.post('/', verifyToken, validation.createPostDataSchema, createNewPost);
router.post('/:post_id/comments', verifyToken, validation.createCommentDataSchema, createNewComment);
router.post('/:post_id/like', verifyToken, validation.LikeDataSchema, createNewLike);

router.patch('/:post_id', verifyToken, validation.updatePostDataSchema, updatePost);

router.delete('/:post_id', verifyToken, deletePost);
router.delete('/:post_id/like', verifyToken, validation.LikeDataSchema, deleteLike);

module.exports = router;