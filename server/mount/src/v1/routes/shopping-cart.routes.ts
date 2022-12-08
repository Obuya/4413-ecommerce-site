import express from 'express'
const controller = require('../controllers/shopping-cart.controller')

const router = express.Router()

/**
 * @route /v1/shopping_cart/
 * @request GET
 * @description Get your shopping cart
 */
router.get('/', controller.getShoppingCart)

/**
 * @route /v1/shopping_cart/
 * @request POST
 * @description Add item to your shopping cart
 */
router.post('/', controller.addItemToShoppingCart)

/**
 * @route /v1/shopping_cart/
 * @request DELETE
 * @description Remove item from your shopping cart
 */
router.delete('/', controller.removeItemFromShoppingCart)

/**
 * @route /v1/shopping_cart/
 * @request PATCH
 * @description Update item in your shopping cart
 */
router.patch('/', controller.updateItemInShoppingCart)

module.exports = router