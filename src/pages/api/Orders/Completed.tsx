import dbConnect from '@/utils/dbConnect';
import Order from '@/models/Order';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    console.log(req.body)
    switch(method){
        case 'GET':
            try{
                const orders=await Order.find({status:'completed'});
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