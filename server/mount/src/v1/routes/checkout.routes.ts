import express from 'express'
const controller = require('../controllers/checkout.controller')
import { checkJwt } from '../utils/checkJwt'
import { authenticateJwt } from '../utils/authenticateJwt'

const router = express.Router()
/**
 * @route /v1/checkout
 * @request POST
 * @description purchase a products
 */
router.post('/', checkJwt, authenticateJwt, controller.purchaseProducts)

module.exports = router