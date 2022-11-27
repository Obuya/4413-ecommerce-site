import { Request, Response, NextFunction } from 'express'

const getUsers = async (req: Request, res: Response) => {

}

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        return res.status(200).json({
            message: ''
        })
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