import dbConnect from '@/utils/dbConnect';
import Videos from '@/models/Videos';
dbConnect();
export default async (req:any,res:any)=>{
    const videoId=req.query.videoId;
    const {method}=req;
    switch(method){

        case 'DELETE':
            try{
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