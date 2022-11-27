import jwt from 'jsonwebtoken'
const TOKEN_SECRET = process.env.TOKEN_SECRET!


export const generateAuthToken = (id, username, type, expiresIn='2h') => {
    const token = jwt.sign({
        id: id,
        username: username,
        type: type
    }, TOKEN_SECRET, {expiresIn: expiresIn})
    return token
}

export const verifyAuthToken = (token) => {
    return jwt.verify(token, TOKEN_SECRET)
}