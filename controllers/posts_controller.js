'use strict';

const { User, Category, Post, Comment, PostCategory, Like } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const paginate = require('../helpers/pagination');
const { validationResult } = require('express-validator');
const {
    newCommentFailures,
    newPostFailures,
    newLikeFailures
} = require('../helpers/errorsOutputFormat')


async function getAllPosts(req, res) {
    try {
        // get the query params
        const { search, page, limit} = req.query
        let { order_by, order_direction, fromDate, toDate, status } = req.query
        let searchData = {};
        let filter1 = [];
        // let filter2 = [];
        let filterStatus = [];
        let order = [];

        if (order_by !== "id" && order_by !== "createdAt"
            && order_by !== 'updatedAt' && order_by !== 'rating')
            order_by = "rating";
        if (order_direction !== "desc" && order_direction !== "asc")
            order_direction = "desc";
        // add the search term to the search object
        if (search) {
            searchData = {
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            };
        }
        // add the order parameters to the order
        if (order_by && order_direction) {
            order.push([order_by, order_direction]);
        }
        if (fromDate && toDate)
            filter1.push([new Date(fromDate), new Date(toDate)])
        console.log(filter1);
        // if (category)
        //     filter2.push(["category", category])
        // console.log(filter2);
        if (status && (status === "active" || status === "inactive"))
            filterStatus.push([status])
        console.log(filterStatus);
        // transform function that can be passed to the  paginate method
        const transform = async (posts) => {
            return await Promise.all(posts.map( async post => {
                const user = await User.findOne( { where: { id: post.author } })
                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    rating: post.rating,
                    author: user.full_name,
                    authorId: post.author,
                    publish_date: post.createdAt
                }
            }))
        }
        // paginate method that takes in the model, page, limit, search object, order and transform
        const allPosts = await paginate(Post, page, limit, searchData, filter1, filterStatus, order, transform)

        if (!allPosts) {
            return res.status(404).json({
                status: "error",
                message: "Posts not found"
            })
        } else {
            res.status(200).json(allPosts)
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}


async function getPostById(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById) {
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })
        } else {
            res.status(200).json({ status: "success", data: postById })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllCommentsByPostId(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        let comments = await Comment.findAll({
            where: { post_id: postId },
            include: [{
                model: User,
                required: true,
                attributes: ["full_name"],
            }],
        });

        if (Object.keys(comments).length === 0)
            comments = null;

        res.status(200).json({ status: "success", data: comments });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllCategoriesByPostId(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        let postCategories = await Category.findAll({
            // attributes: ['title'],
            include: [
                {
                    model: PostCategory,
                    where: { post_id: postId },
                    required: true,
                    attributes: [],
                    include: [
                        {
                            model: Post,
                            // where: { id: req.params.post_id },
                            required: true,
                            attributes: [],
                        }],
                }],
        });

        res.status(200).json({ status: "success", data: postCategories });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllLikesByPostId(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        let likes = await Like.findAll({
            where: { post_id: postId },
            include: [{
                model: User,
                required: true,
                attributes: ["full_name"],
            }],
        });

        if (Object.keys(likes).length === 0)
            likes = null;

        res.status(200).json({ status: "success", data: likes });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewPost(req, res) {
    try {
        const errors = validationResult(req).formatWith(newPostFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const newPost = await Post.create({
            author_id: req.user.id,
            title: req.body.title,
            content: req.body.content,
        })

        const categories = req.body.categories.split(',');

        categories.forEach((category) => {
            PostCategory.create({
                post_id: newPost.id,
                category_id: category
            })
        });

        res.status(200).json({
            status: "success",
            message: "New post created successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewComment(req, res) {
    try {
        const errors = validationResult(req).formatWith(newCommentFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        await Comment.create({
            author_id: req.user.id,
            post_id: postId,
            content: req.body.content
        });

        res.status(200).json({
            status: "success",
            message: "New comment created successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewLike(req, res) {
    try {
        const errors = validationResult(req).formatWith(newLikeFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);
        const type = req.body.type;

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        const likeExist = await Like.findOne({
            where: {
                author_id: req.user.id,
                post_id: postId
            }
        });

        if (likeExist && likeExist.type === type) {
            return res.status(403).json({
                status: "error",
                message: `The post has already been ${type}d. You cannot ${type} this post again`
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
                post_id: postId,
                type: type
            })
        }
        // update post rating
        if (type === 'like') {
            await postById.increment('rating', {by: updateValue});
        } else {
            await postById.decrement('rating', {by: updateValue});
        }
        res.status(200).json({
            status: "success",
            message: `New ${type} created successfully`
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function updatePost(req, res) {
    try {
        const errors = validationResult(req).formatWith(newPostFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const {title, content, category} = req.body;

        if (!title && !content && !category)
            return res.status(400).json({
                status: "error",
                message: "No data to update the post"
            })

        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })

        if (postById.author_id !== req.user.id && req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Only the creator of the post or admin can update this post"
            })

        // сделать params и push!

        if (title)
            postById.title = title;
        if (content)
            postById.content = content;

        postById.updatedAt = new Date(Date.now());
        postById.save();

        if (category) {
            const newCategories = category.split(',');

            await PostCategory.destroy({ where: {post_id: postId } });

            newCategories.forEach((newCategory) => {
                PostCategory.create({
                    post_id: postId,
                    category_id: newCategory
                })
            });
        }

        res.status(200).json({
            status: "success",
            message: "Post updated successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deletePost(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);

        res.status(200).json({
            status: "success",
            message: "Post deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deleteLike(req, res) {
    try {
        const postId = Number(req.params.post_id);
        const postById = await Post.findByPk(postId);
        const type = req.body.type;

        res.status(200).json({
            status: "success",
            message: `${type} deleted successfully`
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}



module.exports = {
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
};