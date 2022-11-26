import { Schema, model } from 'mongoose'

// TODO
export interface User {}

const userSchema = new Schema<User>({})

const UserModel = model<User>('User', userSchema)

export default UserModel
