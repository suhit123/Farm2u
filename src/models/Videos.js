const mongoose =require('mongoose');
const VideosSchema =new mongoose.Schema({
    media:{
        type:String,
        required:true
    }
    ,url:{
        type:String,
    }
})
module.exports=mongoose.models.Videos || mongoose.model('Videos',VideosSchema);