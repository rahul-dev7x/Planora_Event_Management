import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:
    {
        type:String,
        enum:["user","event_organizer"],
        default:"user"
    }
},{timestamps:true})

const UserModel=mongoose.model("User",userSchema);
export default UserModel;