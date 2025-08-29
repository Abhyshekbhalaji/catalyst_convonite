import jwt from "jsonwebtoken";
import user from '../models/User.mjs';

export const JWT_SECRET='WELCOME'
export const signUp = async(req,res)=>{
    let{email,name,password}=req.body;
if(!email || !name || !password){
    return res.status(402).json({
        message:"Empty credentials sent",
        userId:null
    })
}
       const [r]= await user.createUser(email,name,password);
      return res.status(201).json({
        message:`The user has been registered under ID: ${r.insertId}`,
        userId:r.insertId
      })

}

export const signIn = async(req,res)=>{
      let{email,password}=req.body;    

      // middle ware logic
 if(!email || !password){
    return res.status(402).json({
        message:"Empty credentials sent",
        token:null
    })
  
}

/*
 [
    {
      id: 1,
      name: 'Abhyshek Bhalaji',
      email: 'abhydyy@gmail.com',
      password_hash: '1234',
      role: 'customer',
      created_at: 2025-08-28T15:08:53.000Z,
      updated_at: 2025-08-28T15:08:53.000Z
    }
  ] */
  let [r]=await user.findUserByEmail(email);
    let{name,password_hash,role} =r[0];
    if(password===password_hash){
      let token= jwt.sign({name,email,role},JWT_SECRET);
   res.status(201).json({
    message:"Token is updated",
    token:token
   })   
    }else{
        return res.status(409).json({
            message:"Invalid credentials",
            token:null
        })
    }
  
}