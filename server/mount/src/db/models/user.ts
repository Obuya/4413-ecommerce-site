import { Schema, model } from 'mongoose'
import { Review, reviewSchema, productSchema, Product } from './product'

// TODO
export interface User {
    username: string,
    hash: string,
    reviews: Review[],
    purchases: Product[]
}

const userSchema = new Schema<User>({
    username: { unique: true, type: String, maxlength: 50},
    hash: String,
    reviews: [reviewSchema],
    purchases: [productSchema]
})

const UserModel = model<User>('User', userSchema)

export default UserModel
