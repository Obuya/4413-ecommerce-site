import { Schema, model, ObjectId, Mongoose } from 'mongoose'

// TODO

type ReviewScore = 1 | 2 | 3 | 4 | 5 | 'NA'
export interface Review {
    text: string,
    score: ReviewScore,
    reviewDate: string,
    reviewerId: ObjectId,
    name: string,
}

export const reviewSchema = new Schema<Review>({
    text: String,
    score: {
        type: String,
        enum: [1, 2, 3, 4, 5, 'NA'],
        default: 'NA'
    },
    reviewDate: String,
    reviewerId: Schema.Types.ObjectId,
    name: String,
})

interface ProductDetails {
    brand: string,
    type: string,
    subcategories: string,
}

export interface Product {
    price: number,
    quantity: number,
    reviews: Review[],
    description: string,
    details: ProductDetails,
    sellerName: string,
    name: string
    imageURLs: string,
    purchases: string[]
}

interface Purchase {
    id: string,
    quantity: number
}

const purchaseSchema = new Schema<Purchase>({
    id: String,
    quantity: Number
})

export const productDetails = new Schema<ProductDetails>({
    brand: String,
    type: String,
    subcategories: String,
})

export const productSchema = new Schema<Product>({
    price: Number,
    quantity: Number,
    reviews: [reviewSchema],
    description: String,
    details: productDetails,
    sellerName: String,
    name: String,
    imageURLs: String,
    purchases: [purchaseSchema]
})


const ProductModel = model<Product>('Product', productSchema)

export default ProductModel

