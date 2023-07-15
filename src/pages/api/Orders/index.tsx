import dbConnect from '@/utils/dbConnect';
import Orderi from '@/models/Orderi';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    console.log(req.body)
    switch(method){
        case 'POST':
            try{
                const order=await Orderi.create(req.body);
                return res.status(201).json({success:true,data:order})
            }
            catch(err){
                console.log(err)
                return res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const orders=await Orderi.find().populate('products.productId', 'image1 heading');
                return res.status(200).json({success:true,data:orders})
            }
            catch(err){
                console.log(err)
                return res.status(400).json({success:false});
            }
            break;
          default:
            return res.status(400).json({ success: false });
            break;
    }
}