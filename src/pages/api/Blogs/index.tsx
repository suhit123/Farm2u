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
                return res.status(201).json({success:true,data:user})
            }
            catch(err){
                return res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const { start, end } = req.query;
                const blogs = await BlogsA.find({}, '-bodycontent -comments')
                .sort({ publishDate: 'descending' })
                .skip(Number(start))
                .limit(Number(end) - Number(start) + 1);
                if(blogs){    
                    return res.status(200).json(blogs)}
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