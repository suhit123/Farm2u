import dbConnect from '@/utils/dbConnect';
import BlogsA from '@/models/BlogsA';
import { getToken } from 'next-auth/jwt';
dbConnect();
const bcrypt=require("bcrypt");
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const blogid=req.query.Blogid;
    const {method}=req;
    switch(method){
        case 'GET':
            try{
                const blogs=await BlogsA.findOne({_id:blogid});
                if(blogs){    
                    return res.status(200).json(blogs)}
                else{
                    return res.status(404).send("iderror");
                }
            }
            catch(err){
                return res.status(404).send("iderror");
            }
            break;
            
        case 'POST':
            try {
                const blog = await BlogsA.findOne({_id:blogid});
                blog.comments.push({ name:req.body.name, comment:req.body.comment, publishDate:Date.now()});
                await blog.save();
                return res.status(200).json({ message: 'Comment added to cart successfully' });
              } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
              }
              break;
        case 'DELETE':
            try{
                const session:any=await getToken({req});
                if(!session || session.user.role!=="admin"){
                    return res.status(401).json({message:"unauthorized"})
                }
                await BlogsA.findByIdAndDelete(blogid);
                return res.status(200).send('delted');
            }
            catch(err){
                return res.status(401).send("iderror");
            }
            break;
        case 'PATCH':
            try{
                const session:any=await getToken({req});
                if(!session || session.user.role!=="admin"){
                    return res.status(401).json({message:"unauthorized"})
                }
                await BlogsA.findByIdAndUpdate(blogid,req.body);
                return res.status(200).send('edited');
            }
            catch(err){
                return res.status(401).send("iderror");
            }
            break;
        default:
            return res.status(400).json({success:false});
    }
}