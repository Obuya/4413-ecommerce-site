import { Request, Response } from 'express'

const getUsers = async (req: Request, res: Response) => {

}

const getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params
}

const createUser = async (req: Request, res: Response) => {

}

module.exports = {
    getUsers,
    getOneUser,
    createUser
}