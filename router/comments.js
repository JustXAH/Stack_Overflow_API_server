'use strict';

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const { Validation } = require('../middleware/dataValidation')
const validation = new Validation;
const {
    getCommentById,
    getAllLikesByPostId,
    createNewCommentLike,
    updateComment,
    deleteComment,
    deleteCommentLike
} = require('../controllers/comments_controller');

router.get('/:comment_id', getCommentById);
router.get('/:comment_id/like', verifyToken, getAllLikesByPostId);

router.post('/:comment_id/like', verifyToken, validation.likeDataSchema, createNewCommentLike);

router.patch('/:comment_id', verifyToken, validation.commentDataSchema, updateComment);

router.delete('/:comment_id', verifyToken, deleteComment);
router.delete('/:comment_id/like', verifyToken, validation.likeDataSchema, deleteCommentLike);

module.exports = router;