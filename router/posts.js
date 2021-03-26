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
} = require('../controllers/posts_controller');


router.get('/', getAllPosts);
router.get('/:post_id', getPostById);
router.get('/:post_id/comments', getAllCommentsByPostId);
router.get('/:post_id/categories', verifyToken, getAllCategoriesByPostId);
router.get('/:post_id/like', verifyToken, getAllLikesByPostId);

router.post('/', verifyToken, validation.createPostDataSchema, createNewPost);
router.post('/:post_id/comments', verifyToken, validation.createCommentDataSchema, createNewComment);
router.post('/:post_id/like', verifyToken, validation.createLikeDataSchema, createNewLike);

router.patch('/:post_id', verifyToken, validation.updatePostDataSchema, updatePost);

router.delete('/:post_id', verifyToken, validation.createLikeDataSchema, createNewLike);
router.delete('/:post_id', verifyToken, validation.createLikeDataSchema, createNewLike);
// router.get('/:user_id', verifyToken, getUserById);
// router.post('/', verifyToken, validation.registerDataSchema, createNewUser);
// router.post('/avatar', verifyToken, imageUploadHandler, avatarUpload);
// router.patch('/:user_id', verifyToken, validation.updateDataSchema, updateUserData);
// router.delete('/:user_id', verifyToken, deleteUser);

module.exports = router;