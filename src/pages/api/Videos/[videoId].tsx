import dbConnect from '@/utils/dbConnect';
import Videos from '@/models/Videos';
import { getToken } from 'next-auth/jwt';
dbConnect();
export default async (req:any,res:any)=>{
    const videoId=req.query.videoId;
    const {method}=req;
    switch(method){

        case 'DELETE':
            try{
                const session:any=await getToken({req});
                if(!session || session.user.role!=="admin"){
                    return res.status(401).json({message:"unauthorized"})
                }
                await Videos.findByIdAndDelete(videoId);
                return res.status(200).send('delted');
            }
            catch(err){
                return res.status(401).send("iderror");
            }
            break;
        default:
            return res.status(400).json({success:false});
    }
}