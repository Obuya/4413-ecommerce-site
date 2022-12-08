import { Request, Response } from 'express'
import ProductModel from '../../db/models/product'

const getShoppingCart = async (req: Request, res: Response) => {
  try {
    let shopping_cart = req.session.shopping_cart

    if (!shopping_cart){
      req.session.shopping_cart = []
      shopping_cart = []
    }
    return res.status(200).json({
      shopping_cart: shopping_cart
    })
  } catch (err){
    console.log(err)
    return res.status(500).json({
      message: "Error: Internal Server Error"
    })
  }
}

const addItemToShoppingCart = async (req: Request, res: Response) => {
  const { product_id } = req.body
  try {
    if (!product_id){
      return res.status(400).json({
        message: "Error: missing product id unable to add item to shopping cart"
      })
    }

    const product = await ProductModel.findOne({_id: product_id})
    console.log(product)
    if (!product){
      return res.status(404).json({
        message: `Error: product with id: ${product_id} not found`
      })
    }

    let shopping_cart: any[] = req.session.shopping_cart
    if (!shopping_cart){
      req.session.shopping_cart = []
      shopping_cart = []
    }
    // // only add to shopping cart if product does not already exist in cart
    if (!shopping_cart.some(product => product._id === product_id)){
      shopping_cart.push(product)
    } else {
      const itemIndex = shopping_cart.findIndex(product => product._id === product_id)
      console.log(itemIndex)
      shopping_cart[itemIndex] =  {
        ...shopping_cart[itemIndex],
        quantity: shopping_cart[itemIndex].quantity + 1
      }
    }
    req.session.shopping_cart = shopping_cart

    return res.status(200).json({
      shopping_cart: shopping_cart
    })
  } catch (err){
    console.log(err)
    return res.status(500).json({
      message: "Error: Internal Server Error"
    })
  }
}

const removeItemFromShoppingCart = async (req: Request, res: Response) => {
  const { product_id } = req.body
  try {
    if (!product_id){
      return res.status(400).json({
        message: "Error: missing product id unable to remove item from shopping cart"
      })
    }

    let shopping_cart: any[] = req.session.shopping_cart
    if (!shopping_cart){
      return res.status(404).json({
        message: "Error: unable to remove item from an empty cart"
      })
    }

    shopping_cart = shopping_cart.filter(product => product._id !== product_id)
    req.session.shopping_cart = shopping_cart

    return res.status(200).json({
      shopping_cart: shopping_cart
    })
  } catch (err){
    console.log(err)
    return res.status(500).json({
      message: "Error: Internal Server Error"
    })
  }
}


module.exports = {
  getShoppingCart,
  addItemToShoppingCart,
  removeItemFromShoppingCart
}


