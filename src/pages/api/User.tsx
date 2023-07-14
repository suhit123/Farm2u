import dbConnect from '../../utils/dbConnect';
import UserB from '../../models/UserB';
import { NextApiRequest, NextApiResponse } from 'next';
dbConnect();
const bcrypt=require("bcrypt");

export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const {method}=req;
    switch(method){
        case 'POST':
            const check=await UserB.findOne({email:req.body.email});
            if(check==null){
            try{
                const userdetails={
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    password:await bcrypt.hash(req.body.password,12),
                    role:"user",
                    
                }
                const user=await UserB.create(userdetails);
                res.status(201).json({success:true,data:user})
            }
            catch(err){
                console.log(err)
                res.status(400).json({success:false});
            }
            }
            else{
                return res.status(400).send("emailerror")
            }
            break;
        default:
            res.status(400).json({success:false});
    }
}