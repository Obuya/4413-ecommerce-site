import { Response, NextFunction, Request } from "express"
import jwt from 'jsonwebtoken'

const TOKEN_SECRET = process.env.TOKEN_SECRET!

// Checks Authentication of the JWT
export const authenticateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.token
    if (!token) return res.status(404).json({
        message: "Error: please provide a valid token"
    })

    return jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({
            message: "Error: invalid token"
        })
        req.user = user
        return next()
    })
}
