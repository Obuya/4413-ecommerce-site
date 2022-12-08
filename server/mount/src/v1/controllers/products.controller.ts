import { Request, Response } from 'express'
import ProductModel from '../../db/models/product'
import UserModel from '../../db/models/user'

const getProducts = async (req: Request, res: Response) => {
    const { type, brand } = req.query
    try {
        const products = await ProductModel.find().limit(50)
        let filterProducts = products
        if (type){
            filterProducts = filterProducts.filter(product => product.details.type === type)
        }
        if (brand){
            filterProducts = filterProducts.filter(product => product.details.brand === brand)
        }
        return res.status(200).json(filterProducts)
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

const getOneProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const product = await ProductModel.findById(id)
        if (!product) return res.status(404).json({
            message: `Error: Unable to find product with id: ${id}`
        })
        return res.status(200).json(product)
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

const createProduct = async (req: Request, res: Response) => {
    const { 
        description,
        details,
        price,
        quantity,    
    } = req.body
    try {

        if (!description || !details || !price || !quantity){
            return res.status(400).json({
                message: "Error: Missing description or details or price or quantity for the product"
            })
        }
        const product = new ProductModel({
            description,
            details,
            price,
            quantity,
            reviews: []
        })
        await product.save()

        return res.status(201).json({
            message: "Successfully created product",
            id: product._id
        })
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

const createReview = async (req: Request, res: Response) => {
    const { id } = req.params
    const { text, score, name } = req.body
    try {
        if (!text || !score || score < 1 || score > 5){
            return res.status(400).json({
                message: 'Error: Missing review text or Reviews score unable to add review'
            })
        }
        
        await ProductModel.findByIdAndUpdate(id, {
            $push: {
                reviews: {
                    text,
                    score,
                    reviewDate: new Date(),
                    name
                }
            }
        })

        await UserModel.findByIdAndUpdate(id, {
            $push: {
                reviews: {
                    text,
                    score,
                    reviewDate: new Date(),
                }
            }
        })
        return res.status(201).json({
            message: `Successfully created review for product ${id}`,
        })
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    createReview
}