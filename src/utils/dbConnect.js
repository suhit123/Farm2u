import mongoose from 'mongoose';
const connection={};
async function dbConnect(){
    if(connection.isConnected){
        return;
    }
    const db=await mongoose.connect('mongodb+srv://GenmatrixRemedies:xAqmCY1NKyIwcoZF@cluster0.jmeknto.mongodb.net/Genmatrix',{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    });
    connection.isConnected=db.connections[0].readyState;
    console.log(connection.isConnected);
}
export default dbConnect;
