import express from 'express'
const usersRoutes = require('./routes/users.routes')
const productsRoutes = require('./routes/products.routes')

const router = express.Router()

/**
 * @route /v1/users
 */
router.use('/users', usersRoutes)

/**
 * @route /v1/products
 */
router.use('/products', productsRoutes)

module.exports = router