import { ErrorRequestHandler, NextFunction, Request, Response } from "express"

const errorController: ErrorRequestHandler = async (err, req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(400).json({
            message: err
        })
    } catch(error){
        return res.status(500).send('An unknown error occurred.');
    }
}

const handleDuplicateKeyError = (err, res) => {   
    const field = Object.keys(err.keyValue)
    const code = 409;res.status(code).send(`An account with that ${field} already exists.`)
}
module.exports = {
    errorController
}