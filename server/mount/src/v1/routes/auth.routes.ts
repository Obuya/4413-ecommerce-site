import express from 'express'
import { authenticateJwt } from '../utils/authenticateJwt'
import { checkJwt } from '../utils/checkJwt'
const controller = require('../controllers/auth.controller')

const router = express.Router()

/**
 * @route /v1/auth/register
 * @request POST
 * @description Register a new user
 */
router.post('/register', controller.registerUser)

/**
 * @route /v1/auth/login
 * @request POST
 * @description Login a returning user
 */
router.post('/login', controller.verifyUserLogin)

/**
 * @route /v1/auth/verify-token
 * @request GET
 * @description Verify a users jwt token
 */
router.get('/verify-token', checkJwt, authenticateJwt, controller.verifyToken)

module.exports = router