'use strict';

const { User, Category, Post, Comment, PostCategory, Like } = require('../models');
const { Op } = require('sequelize');
// const paginate = require('../helpers/pagination');
const { validationResult } = require('express-validator');
const {
    newCommentFailures,
    newPostFailures,
    newLikeFailures,
    removeLikeFailures
} = require('../helpers/errorsOutputFormat')

const paginate = require('express-paginate');

async function getAllCategories (req, res, next) {
    // try {
        let { page, limit, order } = req.query;

        if (!limit) {
            limit = 2;
        }
        if (!page)
            page = 1;

        await Category.findAndCountAll(
            {
                limit: limit,
                offset: req.skip,
                order: [['id', 'ASC']],
            }).then(results => {
                const itemCount = results.count;
                const pageCount = Math.ceil(results.count / req.query.limit);
                res.status(200).json({
                    success: true,
                    data: results,
                    pageCount,
                    itemCount,
                    pages: paginate.getArrayPages(req)(3, pageCount, page)
                });
            }).catch(err => next(err))
    // } catch (err) {
    //     res.status(500).json({ status: "error", message: err });
    // }
}

module.exports = {
    getAllCategories,
}