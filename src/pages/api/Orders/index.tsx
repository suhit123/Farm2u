import dbConnect from '@/utils/dbConnect';
import Order from '@/models/Order';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    console.log(req.body)
    switch(method){
        case 'POST':
            try{
                const order=await Order.create(req.body);
                res.status(201).json({success:true,data:order})
            }
            catch(err){
                console.log(err)
                res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const orders=await Order.find();
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