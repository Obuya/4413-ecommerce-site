import { Request, Response, NextFunction } from 'express'
import UserModel from '../../db/models/user'

const getUsers = async (req: Request, res: Response) => {

}

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const user = req.user
    try {
        if (!user){
            return res.status(404).json({
                message: 'Error: User not found'
            })
        }
        // remove hash from the user object you will return
        const result = await UserModel.findById(user.id, '-hash')
        return res.status(200).json(result)
    } catch (error){
        console.log(error)
        return res.status(500).json({
            message: error
        })
        //return next(error)
    }
}
module.exports = {
    getUsers,
    getOneUser
}