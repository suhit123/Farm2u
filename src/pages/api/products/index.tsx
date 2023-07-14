import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'POST':
            try{
                const data=req.body;
                Object.assign(data,{comments:[]});
                const user=await Product.create(data);
                res.status(201).json({success:true,data:user})
            }
            catch(err){
                console.log(err);
                res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const blogs=await Product.find();
                if(blogs){    
                    res.status(200).json(blogs)}
                else{
                    res.status(404).json({});
                }
            }
            catch(err){
                res.status(400).json({success:false});
            }
            break;
        default:
            res.status(400).json({success:false});
    }
}