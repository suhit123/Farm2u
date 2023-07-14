import dbConnect from "@/utils/dbConnect";
import Order from "@/models/Order";
import { NextApiRequest, NextApiResponse } from "next";
dbConnect();
export const config = {
    api: {
      responseLimit: false,
    },
  }
export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const {method}=req;
    const UserId=req.query.UserId;
    switch(method){
        case 'GET':
            try{
                const orders=await Order.find({userId:UserId});
                res.status(200).json({success:true,data:orders})
            }
            catch(err){
                console.log(err)
                res.status(400).json({success:false});
            }
            break;
          default:
            res.status(400).json({ success: false });
            break;
    }
}