import dbConnect from '@/utils/dbConnect';
import Videos from '@/models/Videos';
dbConnect();
export const config = { api: { bodyParser: { sizeLimit: '1mb' } } }
export default async (req:any,res:any)=>{
    const {method}=req;
    switch(method){
        case 'POST':
            try{
                const data=req.body;
                const user=await Videos.create(data);
                return res.status(201).json({success:true,data:user})
            }
            catch(err){
                return res.status(400).json({success:false});
            }
            break;
        case 'GET':
            try{
                const videos=await Videos.find();
                if(videos){    
                    return res.status(200).json(videos)}
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