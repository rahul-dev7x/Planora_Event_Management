import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config({})




const dbConnection=async()=>{
    if(!process.env.MONGO_URI)
        {
            console.log("Mongo Uri not found")
        }
    try{
        
mongoose.connect(process.env.MONGO_URI );
console.log("db Connected")
    }
    catch(err)
    {
        console.log(err)
    }
}
export default dbConnection;