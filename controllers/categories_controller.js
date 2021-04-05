'use strict';

const { Category, Post, PostCategory } = require('../models');
const { paginateCategories } = require('../helpers/pagination');
const { validationResult } = require('express-validator');
const {
    newCategoryFailures,
    updateCategoryFailures
} = require('../helpers/errorsOutputFormat')

async function getAllCategories (req, res) {
    try {
        // get the query params
        const { page, limit } = req.query
        let { order_by, order_direction } = req.query
        let order = [];

        if (order_by !== "id" && order_by !== 'title'
            && order_by !== "createdAt" && order_by !== 'updatedAt')
            order_by = "id";
        if (order_direction !== "desc" && order_direction !== "asc")
            order_direction = "asc";

        // add the order parameters to the order
        if (order_by && order_direction)
            order.push([order_by, order_direction]);

        // transform function that can be passed to the  paginate method
        const transform = async (categories) => {
            return await Promise.all(categories.map( async category => {
                return {
                    id: category.id,
                    title: category.title,
                    description: category.description,
                    publish_date: category.createdAt,
                    last_update: category.updatedAt
                }
            }))
        }
        // paginate method that takes in the model, page, limit, search object, order and transform
        const allCategories = await paginateCategories(page, limit, order, transform)

        if (!allCategories) {
            return res.status(404).json({
                status: "error",
                message: "Categories not found"
            })
        } else {
            res.status(200).json(allCategories)
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getCategoryById(req, res) {
    try {
        const categoryId = Number(req.params.category_id);
        const categoryById = await Category.findByPk(categoryId);

        if (!categoryById) {
            return res.status(404).json({
                status: "error",
                message: "Category not found by requested param - category ID"
            })
        } else {
            res.status(200).json({ status: "success", data: categoryById })
        }
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function getAllPostsByCategoryId(req, res) {
    try {
        const categoryId = Number(req.params.category_id);
        const categoryById = await Category.findByPk(categoryId);

        if (!categoryById)
            return res.status(404).json({
                status: "error",
                message: "Category not found by requested param - category ID"
            })

        let postByCategoryId = await Post.findAll({
            include: [{
                model: PostCategory,
                where: { category_id: categoryId },
                required: true,
                attributes: [],
            }]
        })

        if (Object.keys(postByCategoryId).length === 0)
            postByCategoryId = null;

        res.status(200).json({ status: "success", data: postByCategoryId });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function createNewCategory(req, res) {
    try {
        const errors = validationResult(req).formatWith(newCategoryFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        if (req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Only admin can create new category"
            })

        const title = req.body.title;
        const category = await Category.findOne({ where: { title: title } });

        if (category)
            return res.status(403).json({
                status: "error",
                message: "Category with this title already exist"
            })

        let description = req.body.description;
        if (!description)
            description = null;

        await Category.create({
            title: title,
            description: description,
        })

        res.status(201).json({
            status: "success",
            message: "New category created successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function updateCategory(req, res) {
    try {
        const errors = validationResult(req).formatWith(updateCategoryFailures);

        if (!errors.isEmpty())
            return res.status(400).json({
                status: "error",
                errors: errors.array()
            })

        const { title, description } = req.body;

        if (!title && !description)
            return res.status(400).json({
                status: "error",
                message: "No data to update the category"
            })

        if (req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Only admin can update the category"
            })

        const categoryId = Number(req.params.category_id);
        const categoryById = await Category.findByPk(categoryId);

        if (!categoryById)
            return res.status(404).json({
                status: "error",
                message: "Category not found by requested param - category ID"
            })

        if (title)
            categoryById.title = title;
        if (description)
            categoryById.description = description;

        await Category.update({
            title: categoryById.title,
            description: categoryById.description,
            updatedAt: new Date(Date.now())
        }, { where: { id: categoryId} })

        res.status(200).json({
            status: "success",
            message: "Category updated successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

async function deleteCategory(req, res) {
    try {
        if (req.user.role !== 'admin')
            return res.status(403).json({
                status: "error",
                message: "Permission denied! Only admin can delete the category"
            })

        const categoryId = Number(req.params.category_id);
        const categoryById = await Category.findByPk(categoryId);

        if (!categoryById)
            return res.status(404).json({
                status: "error",
                message: "Category not found by requested param - category ID"
            })

        await categoryById.destroy();
        await PostCategory.destroy({ where: { category_id: categoryId } });

        res.status(200).json({
            status: "success",
            message: "Category deleted successfully"
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: err });
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getAllPostsByCategoryId,
    createNewCategory,
    updateCategory,
    deleteCategory
}