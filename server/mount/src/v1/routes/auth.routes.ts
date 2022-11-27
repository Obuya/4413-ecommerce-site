import express from 'express'
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

module.exports = router