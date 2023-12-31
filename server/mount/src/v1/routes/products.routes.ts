import express from 'express'
import { authenticateJwt } from '../utils/authenticateJwt'
import { checkJwt } from '../utils/checkJwt'
const controller = require('../controllers/products.controller')

const router = express.Router()

/**
 * @route /v1/products/
 * @request GET
 * @description Get all products information
 */
router.get('/', controller.getProducts)

/**
 * @route /v1/products/purchased
 * @request GET
 * @description Get all purchased products
 */
router.get('/purchased', checkJwt, authenticateJwt, controller.purchasedProducts)

/**
 * @route /v1/products/:id
 * @request GET
 * @description Get specific products information
 */
router.get('/:id', controller.getOneProduct)

/**
 * @route /v1/products/
 * @request POST
 * @description Create product
 */
router.post('/', checkJwt, authenticateJwt, controller.createProduct)

/**
 * @route /v1/products/:id/reviews
 * @request POST
 * @description Create product review
 */
router.post('/:id/reviews', controller.createReview)


module.exports = router