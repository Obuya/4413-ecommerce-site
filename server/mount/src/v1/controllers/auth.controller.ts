import { Request, Response, NextFunction } from 'express'
import UserModel from '../../db/models/user'
import bcrypt, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
const TOKEN_SECRET = process.env.TOKEN_SECRET!

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({
                message: "Error: username or password not provided"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({
            username: username,
            hash: hash
        })
        await newUser.save()
        return res.status(201).json({
            message: 'Successfully created',
            user: {id: newUser.id}
        })
    } catch(error){
        console.log(error)
        // TODO NEED TO ADD ERROR HANDLING FOR MONGODB FAILURE TO INSERT
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
        //return next(error)
    }
}

const verifyUserLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body
    try {
        if (!username || !password){
            return res.status(400).json({
                message: "Error: username or password not provided"
            })
        }

        const user = await UserModel.findOne({
            username: username
        })
        if (!user){
            return res.status(404).json({
                message: 'Error: invalid username or password'
            })
        }

        const compare = await bcrypt.compare(password, user.hash)
        if (!compare){
            return res.status(404).json({
                message: 'Error: invalid username or password'
            })
        }
        // TODO potentially add others roles here for admin/user etc.
       const token = jwt.sign({
            id: user.id,
            username: user.username,
            type: 'user'
       }, TOKEN_SECRET, {expiresIn: '2h'})

       // remove hash from user to safely return user object
       const { hash, ...userWithoutHash } = user.toObject()

       return res.status(200).json({
        message: 'Succesfully logged in',
        token: token,
        user: userWithoutHash
       })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

module.exports = {
    registerUser,
    verifyUserLogin
}