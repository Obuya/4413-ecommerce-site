import { Request, Response } from "express"
import { incPaymentNumber, payment_number } from "../.."
import ProductModel from "../../db/models/product"
import UserModel from "../../db/models/user"

const purchaseProducts = async (req: Request, res: Response) => {
  const { 
    id, 
    shopping_cart,
    address,
    postalCode,
    shippingDetails,
    name,
    cardNumber
  } = req.body

  const user = req.user
  try {
    if (!id || !shopping_cart){
      return res.status(400).json({
        message: "Error: no id provided or shopping cart"
      })
    }

    if (!cardNumber || !shippingDetails){
      return res.status(400).json({
        message: "Error: no card provided or shipping details"
      })
    }

    // Deny the 3rd payment request
    if (payment_number !== 0 && payment_number % 3 === 0){
        res.status(400).json({
          message: 'Credit Card Authorization Failed',
          payment_number: payment_number
      })
      incPaymentNumber()
      return
    }

    //const updateUser = await UserModel.find
    const userPurchases = await UserModel.findByIdAndUpdate(user.id, {
      $push: {
        purchases: [...shopping_cart]
      }
    })

    const adminSold = await UserModel.findOneAndUpdate({role: 'admin'}, {
      $push: {
        sold: [...shopping_cart, {date: new Date()}]
      }
    })

    for await (const product of shopping_cart){
      const productPurchases = await ProductModel.findByIdAndUpdate(product._id, {
        $push: {
          purchases: {
            id: user.id,
            quantity: product.quantity
          }
        }
      })
    }


    incPaymentNumber()
    return res.status(200).json({
      message: 'Successfully purchased items'
    })
  } catch (err){
    console.log(err)
    return res.status(500).json({
      message: 'Error: Internal Server Error'
    })
  }
}

module.exports = {
  purchaseProducts
}