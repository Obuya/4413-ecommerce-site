import express from 'express'
import { authenticateJwt } from '../utils/authenticateJwt'
import { checkJwt } from '../utils/checkJwt'
const controller = require('../controllers/users.controller')

const router = express.Router()

/**
 * @route /v1/users/
 * @request GET
 * @description Get specific user information (must be correct authed account)
 */
router.get('/', checkJwt, authenticateJwt, controller.getOneUser)

module.exports = router