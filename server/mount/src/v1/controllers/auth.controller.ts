import { Request, Response, NextFunction } from 'express'
import UserModel from '../../db/models/user'
import bcrypt, { hash } from 'bcryptjs'
import { generateAuthToken, verifyAuthToken } from '../utils/auth'
import { JwtPayload } from 'jsonwebtoken'


const SALT_ROUNDS = 10

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(400).json({
                message: "Error: username or password not provided"
            })
        }

        const salt = await bcrypt.genSalt(SALT_ROUNDS)
        const hash = await bcrypt.hash(password, salt)
        const newUser = new UserModel({
            username: username,
            hash: hash
        })
        await newUser.save()
        const token = generateAuthToken(newUser.id, username, 'user')
        return res.status(201).json({
            message: 'Successfully created',
            user: {id: newUser.id},
            token: token
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
        const token = generateAuthToken(user.id, username, 'user')
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

const verifyToken = async (req: Request, res: Response) => {
    const token = req.token!
    try {
        const verify_token = verifyAuthToken(token) as JwtPayload
        console.log(verify_token)
        return res.status(200).json({
            message: 'Successfully verified token',
            token: token,
            user: verify_token
        })
    } catch (error){
        return res.status(500).json({
            message: 'Error: Internal Server Error'
        })
    }
}

module.exports = {
    registerUser,
    verifyUserLogin,
    verifyToken
}