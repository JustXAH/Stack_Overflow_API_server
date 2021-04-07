'use strict';

const { User, Comment,  Like } = require('../models');
const { validationResult } = require('express-validator');
const updateUserRating = require('../helpers/updateUserRating');
const {
    newLikeFailures,
    updateCommentFailures,
    removeLikeFailures,
} = require('../helpers/errorsOutputFormat');


async function getCommentById(req, res) {
    try {
        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);

        if (!commentById) {
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })
        } else {
            res.status(200).json({ status: "success", data: commentById })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllLikesByPostId(req, res) {
    try {
        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);

        if (!commentById)
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })

        let likes = await Like.findAll({
            where: { comment_id: commentId },
            include: [{
                model: User,
                required: true,
                attributes: ["login", "full_name"],
            }],
        });

        if (Object.keys(likes).length === 0)
            likes = null;

        res.status(200).json({ status: "success", data: likes });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewCommentLike(req, res) {
    try {
        const errors = validationResult(req).formatWith(newLikeFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);
        const type = req.body.type;

        if (!commentById)
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })

        const likeExist = await Like.findOne({
            where: {
                author_id: req.user.id,
                comment_id: commentId,
            }
        });

        if (likeExist && likeExist.type === type) {
            return res.status(403).json({
                status: "error",
                message: `The comment has already been ${type}d. You cannot ${type} this comment again`
            })
        }

        let updateValue;

        // update like type if exist or create new if doesn't exist
        if (likeExist && likeExist.type !== type) {
            updateValue = 2;
            likeExist.type = type;
            likeExist.updatedAt = new Date(Date.now());

            await likeExist.save();
        } else {
            updateValue = 1;

            await Like.create({
                author_id: req.user.id,
                comment_id: commentId,
                type: type
            })
        }
        // update comment and user rating
        if (type === 'like') {
            await commentById.increment('rating', { by: updateValue });
            await User.increment('rating', { by: updateValue, where: { id: commentById.author_id } });
        } else {
            await commentById.decrement('rating', { by: updateValue });
            await User.decrement('rating', { by: updateValue, where: { id: commentById.author_id } });
        }
        res.status(201).json({
            status: "success",
            message: `New ${type} under the comment created successfully`
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function updateComment(req, res) {
    try {
        const errors = validationResult(req).formatWith(updateCommentFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const content = req.body.content;

        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);

        if (!commentById)
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })

        if (commentById.author_id !== req.user.id && req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Only the creator of the comment or admin can update" +
                    " this comment"
            })

        await Comment.update({
            content: content,
            updatedAt: new Date(Date.now())
        }, { where: { id: commentId } })

        res.status(200).json({
            status: "success",
            message: "Comment updated successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deleteComment(req, res) {
    try {
        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);

        if (!commentById)
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })

        if (commentById.author_id !== req.user.id && req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Only the creator of the comment or admin can" +
                    " delete this comment"
            })

        /*
        | Search and delete all comment likes and dislikes from database.
        | Update comment author rating and remove comment.
         */
        await Like.destroy({ where: { comment_id: commentId } });
        await User.decrement({ rating: commentById.rating }, { where: { id: commentById.author_id } });
        await commentById.destroy();

        res.status(200).json({
            status: "success",
            message: "Comment deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deleteCommentLike(req, res) {
    try {
        const errors = validationResult(req).formatWith(removeLikeFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const commentId = Number(req.params.comment_id);
        const commentById = await Comment.findByPk(commentId);
        const type = req.body.type;

        if (!commentById)
            return res.status(404).json({
                status: "error",
                message: "Comment not found by requested param - comment ID"
            })

        const likeExist = await Like.findOne({
            where: {
                author_id: req.user.id,
                comment_id: commentId,
                type: type
            }
        });

        if (!likeExist) {
            return res.status(403).json({
                status: "error",
                message: `This ${type} under the comment doesn't exist. You didn't ${type} this comment`
            })
        }

        // delete like or dislike
        likeExist.destroy();

        // update post rating
        if (type === 'like') {
            await commentById.decrement('rating');
            await req.user.decrement('rating')
        } else {
            await commentById.increment('rating');
            await req.user.increment('rating')
        }

        res.status(200).json({
            status: "success",
            message: `${type} under the comment deleted successfully`
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

module.exports = {
    getCommentById,
    getAllLikesByPostId,
    createNewCommentLike,
    updateComment,
    deleteComment,
    deleteCommentLike
};