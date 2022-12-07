import express from 'express'
const usersRoutes = require('./routes/users.routes')
const productsRoutes = require('./routes/products.routes')
const authRoutes = require('./routes/auth.routes')
const shoppingCartRoutes = require('./routes/shopping-cart.routes')

const router = express.Router()

/**
 * @route /v1/users
 */
router.use('/users', usersRoutes)

/**
 * @route /v1/products
 */
router.use('/products', productsRoutes)

/**
 * @route /v1/auth
 */
router.use('/auth', authRoutes)

/**
 * @route /v1/shopping_cart
 */
router.use('/shopping_cart', shoppingCartRoutes)

module.exports = router