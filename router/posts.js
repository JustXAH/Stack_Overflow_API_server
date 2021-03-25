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
    createNewComment,
    createNewPost,
    createNewLike,
    createNewDislike,
} = require('../controllers/posts_controller');


router.get('/', getAllPosts);
router.get('/:post_id', getPostById);
router.get('/:post_id/comments', getAllCommentsByPostId);
router.get('/:post_id/categories', verifyToken, getAllCategoriesByPostId);
router.get('/:post_id//like', verifyToken, getAllLikesByPostId);

router.post('/:post_id/comments', verifyToken, validation.createCommentDataSchema, createNewComment);
router.post('/', verifyToken, validation.createPostDataSchema, createNewPost);
router.post('/:post_id/like', verifyToken, createNewLike);
router.post('/:post_id/dislike', verifyToken, createNewDislike);
// router.get('/:user_id', verifyToken, getUserById);
// router.post('/', verifyToken, validation.registerDataSchema, createNewUser);
// router.post('/avatar', verifyToken, imageUploadHandler, avatarUpload);
// router.patch('/:user_id', verifyToken, validation.updateDataSchema, updateUserData);
// router.delete('/:user_id', verifyToken, deleteUser);

module.exports = router;