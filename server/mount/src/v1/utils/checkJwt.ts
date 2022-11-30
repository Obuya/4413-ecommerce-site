import { Response, NextFunction, Request } from "express"

// Checks to see if Jwt exists
export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get('Authorization')
  if (!authorization){
    return res.status(404).json({
      message: "Error: please provide a valid token"
    })
  }
  const bearer_token = authorization?.split(' ')[1]
  req.token = bearer_token
  return next()
}
