import Orders from "../models/Orders.mjs";
import User from "../models/User.mjs";
import { JWT_SECRET } from "./authController.mjs";
import jwt from 'jsonwebtoken';
async function convertToUserId(token){
    let {email} = jwt.decode(token ,JWT_SECRET);
    let [r]= await User.findUserByEmail(email);
    return r[0].id
}

export async function placeOrder(req,res){
    let token = req.headers?.token;
    let {shipping_address,payment_method,itemsId}=req.body;


    if(!token){
        return res.status(404).json({
            message:"Login before placing orders",
            order_id:null
        })
    }
    let userId=await convertToUserId(token);
    let r =await Orders.createOrder(userId,shipping_address,payment_method,itemsId);

    return res.status(201).json({
        order_id:r,
        message:"Order has been placed"
    })
}

export async function getOrder(req,res){
     let token = req.headers?.token;
    let userId=await convertToUserId(token);
    if(!token || !userId){
       return res.status(404).json({
            message:'Token not found',
            order_details:null
        })
    }
    let r=await Orders.getOrderById(userId);
    if(!r){
        return  res.status(404).json({
            message:'User Id not found',
            order_details:null
        })
    }
    res.status(201).json({
        message:"Orders have been fetched successfully",
        order_details:r
    })
    
}
