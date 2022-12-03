import { Schema, model, ObjectId, Mongoose } from 'mongoose'

// TODO

type ReviewScore = 1 | 2 | 3 | 4 | 5 | 'NA'
export interface Review {
    text: string,
    score: ReviewScore,
    reviewDate: string,
    reviewerId: ObjectId
}

export const reviewSchema = new Schema<Review>({
    text: String,
    score: {
        type: String,
        enum: [1, 2, 3, 4, 5, 'NA'],
        default: 'NA'
    },
    reviewDate: String,
    reviewerId: Schema.Types.ObjectId
})

interface ProductDetails {
    brand: string,
    type: string
}

export interface Product {
    price: number,
    quantity: number,
    reviews: Review[],
    description: string,
    details: ProductDetails,
    sellerName: string,
    name: string
}

export const productDetails = new Schema<ProductDetails>({
    brand: String,
    type: String
})

export const productSchema = new Schema<Product>({
    price: Number,
    quantity: Number,
    reviews: [reviewSchema],
    description: String,
    details: productDetails,
    sellerName: String,
    name: String
})

const ProductModel = model<Product>('Product', productSchema)

export default ProductModel

