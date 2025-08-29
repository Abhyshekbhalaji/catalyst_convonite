import jwt from 'jsonwebtoken'
const JWT_SECRET='WELCOME'
export const decodeMiddleware = (req,res,next)=>{
let token = req.headers?.token;
if(!token){
    return res.status(404).json({
        message:"Token not Found"
    })
}
let {email}=jwt.decode(token, JWT_SECRET);

req.email = email;
next();

}