import mongoose from "mongoose";

const connectDB =async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDb Connected');
        
    }catch(error){
        console.error('MongoDB Error');

        
    }
};
export default connectDB