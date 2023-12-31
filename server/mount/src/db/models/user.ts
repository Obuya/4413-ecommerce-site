import { Schema, model } from 'mongoose'
import { Review, reviewSchema, productSchema, Product } from './product'

// TODO
export interface User {
    username: string,
    email: string,
    hash: string,
    reviews: Review[],
    purchases: Product[],
    sold?: Product[]
    address?: string,
    name?: string,
    cardNumber?: number,
    city?: string,
    country?: string,
    postalcode?: string,
    role?: string
}

const userSchema = new Schema<User>({
    username: { unique: true, type: String, maxlength: 50},
    email: String,
    name: String,
    cardNumber: Number,
    hash: String,
    reviews: [reviewSchema],
    purchases: [productSchema],
    sold: [productSchema],
    address: String,
    city: String,
    country: String,
    postalcode: String,
    role: String
})

const UserModel = model<User>('User', userSchema)

export default UserModel
