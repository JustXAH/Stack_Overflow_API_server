const { Op } = require('sequelize')
const { Category, Post, Favorite } = require('../models');


const paginatePosts = async (req, pageSize, pageLimit, search = {},
                        filter1 = {},  filterStatus = {},
                        order = {}, transform) => {
    try {
        const limit = parseInt(pageLimit, 10) || 15
        const page = parseInt(pageSize, 10) || 1

        let options = {
            offset: page * limit - limit,
            limit,
            where: {
                status: ["active", "inactive"]
            }
        }

        if (filter1 && filter1.length)
            options.where.createdAt = {[Op.between]: [filter1[0][0], filter1[0][1]]}
        if (filterStatus && filterStatus.length)
            options.where.status = filterStatus

        if (Object.keys(search).length)
            options = {options, ...search}

        if (order && order.length)
            options['order'] = order

        let posts;
        console.log("HERE")
        console.log(req.user.id)
        console.log("HERE")
        if (req.type === "favorites") { // find all favorite posts
            posts = await Post.findAndCountAll({
                include: [{
                    model: Favorite,
                    where: { userId: req.user.id },
                    required: true,
                    attributes: [],
                }]
            })
        } else { // find all Posts
            posts = await Post.findAndCountAll(options)
        }

        if (transform && typeof transform === 'function')
            posts.rows = await transform(posts.rows)

        return {
            status: 'success',
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, posts.count),
            total_posts: posts.count,
            pages: getTotalPages(posts.count, limit),
            limit,
            filter1,
            filterStatus,
            data: posts.rows
        }
    } catch (err) {
        throw 'Internal Server Error'
    }
}

const paginateCategories = async (pageSize, pageLimit, order = {}, transform) => {
    try {
        const limit = parseInt(pageLimit, 10) || 15
        const page = parseInt(pageSize, 10) || 1

        let options = {
            offset: page * limit - limit,
            limit,
        }

        if (order && order.length)
            options['order'] = order

        let { count, rows } = await Category.findAndCountAll(options)

        if (transform && typeof transform === 'function')
            rows = await transform(rows)

        return {
            status: 'success',
            previousPage: getPreviousPage(page),
            currentPage: page,
            nextPage: getNextPage(page, limit, count),
            total_categories: count,
            pages: getTotalPages(count, limit),
            limit,
            data: rows
        }
    } catch (err) {
        throw 'Internal Server Error'
    }
}

const getTotalPages = (count, limit) => {
    let pages = Math.trunc(count / limit)
    if (count % limit > 0)
        pages++
    return pages
}

const getNextPage = (page, limit, total) => {

    if ((total / limit) > page)
        return page + 1;
    return null
}

const getPreviousPage = (page) => {
    if (page <= 1)
        return null
    return page - 1
}
module.exports = { paginatePosts, paginateCategories }