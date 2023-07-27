import dbConnect from '@/utils/dbConnect';
import BlogsB from '@/models/BlogsB';
import { getToken } from 'next-auth/jwt';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'POST':
            try{
                const session:any=await getToken({req});
                if(!session || session.user.role!=="admin"){
                    return res.status(401).json({message:"unauthorized"})
                }
                const data=req.body;
                Object.assign(data,{comments:[]});
                const user=await BlogsB.create(data);
                return res.status(201).json({success:true,data:user})
            }
            catch(err){
                console.log(err)
                return res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const { start, end } = req.query;
                const blogs = await BlogsB.find({}, '-bodycontent -comments')
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