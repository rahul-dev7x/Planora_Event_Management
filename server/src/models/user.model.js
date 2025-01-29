import mongoose from "mongoose";
// import isEmail from 'validator/lib/isEmail.js';
// import validator from "validator"
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
       
    },
    password:{
        type:String,
        minLength:6,
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