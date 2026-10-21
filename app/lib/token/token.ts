import jwt from 'jsonwebtoken'

export const generateToken = (id: string) => {
    const secret = process.env.JWT_SECRET 
    if(!secret) throw new Error('No token is provided')
    return jwt.sign({id},secret,{expiresIn: '7d'})
}



