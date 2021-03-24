'use strict';

const { User, Post, Comment, PostCategory } = require('../models');

// const PostCategory = require('../sequlize').PostCategory;
// const pageSize = process.env.PAGE_SIZE;
const { Op } = require('sequelize');
const paginate = require('../helpers/pagination');
const { validationResult } = require('express-validator');
const { registrationFailures } = require('../helpers/errorsOutputFormat')
const { emailConfirmMessage } = require('../helpers/mailCreators');
const sendMail = require('../helpers/sendMail');
const deletePrevAvatar = require('../helpers/deletePrevAvatar')
const {
    passwordHashing,
    comparingHashPasswords,
    randomTokenCreator,
    JwtTokenCreator
} = require('../helpers/helpers')

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
                const user = await User.findOne( { where: {id: post.author}})
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

        if (!allPosts)
            return res.status(404).json({
                status: "error",
                message: "Posts not found"
            })
        else {
            res.status(200).json(allPosts)
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}


async function getPostById(req, res) {
    try {
        const postById = await Post.findByPk(req.params.post_id);
        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })
        res.status(200).json({ status: "success", data: postById })
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllCommentsByPostId(req, res) {
    try {
        const postById = await Post.findByPk(req.params.post_id);
        if (!postById)
            return res.status(404).json({
                status: "error",
                message: "Post not found by requested param - post ID"
            })
        // console.log(postById)
        let comments = await Comment.findAll({
            where: { post_id: req.params.post_id },
            include: [{
                model: User,
                required: true,
                attributes: ["full_name"],
                // as: 'Users',
                // through: {
                //     attributes: ["full_name"]
                // }
                // attributes: ["full_name"],
                // through: {
                //     where: {id: postById.author}
                // }
            }],

        });
        if (Object.keys(comments).length === 0)
            comments = null
        res.status(200).json({ status: "success", data: comments })
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewPost(req, res) {
    try {
        const postById = await Post.findOne({where: {id: req.params.post_id}})
        if (postById)
            return res.status(403).json({
                status: "error",
                message: "Post with this id already exists"
            })

        await Post.create({
            // need to add Post attributes
        });

        res.status(200).json({
            status: "success",
            message: "New post created successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}
module.exports = {
    getAllPosts,
    getPostById,
    getAllCommentsByPostId,
    createNewPost,
};