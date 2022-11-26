import { Request, Response } from 'express'

const getProducts = async (req: Request, res: Response) => {

}

const getOneProduct = async (req: Request, res: Response) => {
    const { id } = req.params
}

const createProduct = async (req: Request, res: Response) => {

}

module.exports = {
    getProducts,
    getOneProduct,
    createProduct
}