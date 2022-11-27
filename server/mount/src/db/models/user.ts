import { Schema, model } from 'mongoose'

// TODO
export interface User {
    username: string,
    hash: string
}

const userSchema = new Schema<User>({
    username: { unique: true, type: String, maxlength: 50},
    hash: String
})

const UserModel = model<User>('User', userSchema)

export default UserModel
