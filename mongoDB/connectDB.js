import mongoose from "mongoose";

export const connectDB = async (url) =>{
    try {
        await mongoose.connect(url)
        .then(()=>{
            console.log("MONGO DB Connected");
        })
        .catch((e)=>{
            console.log(e);
        });
    } catch (error) {
        console.log("MONGO DB Connection error : " , error);
        process.exit(1);
    }
} 