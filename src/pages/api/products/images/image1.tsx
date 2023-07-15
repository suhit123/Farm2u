import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' },responseLimit:false } }
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'GET':
            try{
                const productsImage1=await Product.find({}, " _id image1");
                if(productsImage1){    
                    return res.status(200).json(productsImage1)}
                else{
                    return res.status(404).json({});
                }
            }
            catch(err){
                return res.status(400).json({success:false});
            }
            break;
        default:
            return res.status(400).json({success:false});
    }
}