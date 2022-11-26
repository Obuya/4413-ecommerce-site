import { Schema, model } from 'mongoose'

// TODO
export interface Product {}

const productSchema = new Schema<Product>({})

const ProductModel = model<Product>('Product', productSchema)

export default ProductModel
