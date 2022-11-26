import express from 'express'
const controller = require('../controllers/users.controller')

const router = express.Router()

/**
 * @route /v1/products/
 * @request GET
 * @description Get all products information
 */
router.get('/', controller.getUsers)

/**
 * @route /v1/products/:id
 * @request GET
 * @description Get specific products information
 */
router.get('/:id', controller.getOneUser)

/**
 * @route /v1/products/
 * @request POST
 * @description Create product
 */
router.get('/', controller.createUser)


module.exports = router