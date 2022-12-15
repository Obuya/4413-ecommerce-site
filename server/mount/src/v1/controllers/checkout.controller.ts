import { Request, Response } from "express"
import ProductModel from "../../db/models/product"
import UserModel from "../../db/models/user"

const purchaseProducts = async (req: Request, res: Response) => {
    const { id, shopping_cart } = req.body
    const user = req.user
    try {
        if (!id || !shopping_cart){
            return res.status(400).json({
                message: "Error: no id provided or shopping cart"
            })
        }
        const userPurchases = await UserModel.findByIdAndUpdate(user.id, {
            $push: {
                purchases: [...shopping_cart]
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

        return res.status(200).json({
            message: 'works'
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