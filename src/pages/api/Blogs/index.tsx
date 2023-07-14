import dbConnect from '@/utils/dbConnect';
import BlogsA from '@/models/BlogsA';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'POST':
            try{
                const data=req.body;
                Object.assign(data,{comments:[]});
                const user=await BlogsA.create(data);
                res.status(201).json({success:true,data:user})
            }
            catch(err){
                res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const blogs=await BlogsA.find().sort({publishDate: 'descending'});
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