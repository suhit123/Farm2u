import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
dbConnect();
const bcrypt=require("bcrypt");
export const config = { api: { bodyParser: { sizeLimit: '100mb' } } }
export default async (req:any,res:any)=>{
    const Productid=req.query.Productid;
    const {method}=req;
    switch(method){
        case 'GET':
            try{
                const blogs=await Product.findOne({_id:Productid});
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
                const blog = await Product.findOne({_id:Productid});
                blog.comments.push({ name:req.body.name,rating:req.body.rating, comment:req.body.comment, publishDate:Date.now()});
                await blog.save();
                return res.status(200).json({ message: 'Comment added to product successfully' });
              } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
              }
              break;
        case 'DELETE':
            try{
                await Product.findByIdAndDelete(Productid);
                return res.status(200).send('delted');
            }
            catch(err){
                return res.status(401).send("iderror");
            }
            break;
        case 'PATCH':
            try{
                await Product.findByIdAndUpdate(Productid,req.body);
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