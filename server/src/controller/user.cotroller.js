
import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {google} from 'googleapis'
import dotenv from "dotenv";
import validator from "validator";
import isEmail from "validator/lib/isEmail.js"
dotenv.config({})
const signUp=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        //console.log("email",email)
        //console.log(email.toString().includes("yahoo"))
        const regex = /[^A-Za-z0-9]/;
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please provide all required fields: name, email, password, and role." });
          }
          if(password.length<6){
            return res.status(400).json({message:"Please Create Password>6",success:false,error:true})
          }
          if(!regex.test(password))
          {
            return res.status(400).json({message:"You have to enter atleast one speacial charecter in password",success:false,error:true})
          }
          if(!validator.isEmail(email))
          {
            return res.status(400).json({message:"Please enter a valid email",success:false,error:true})
          }
          if(email.includes("yahoo"))
          {
            return res.status(400).json({message:"Please enter a valid Gmail",success:false,error:true})

          }
      
          const existingUser = await UserModel.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." ,success:false,error:true});
          }
      
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
      
          const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            role,
          });
      
          await newUser.save();
      
          res.status(201).json({ message: "User registered successfully.",success:true,error:false });

    }
    catch(err)
    {
        res.status(500).json({message:"there is an err while signup",success:false,error:true});
    }
}


const login = async (req, res) => {
    if(!process.env.JWT_SECRET_KEY)
    {
        console.log("There is no jwt key")
    }
    try {
      const { email, password } = req.body;
      // if(password.length<6){
      //   return res.status(400).json({message:"Please Create Password>6",success:false,error:true})
      // }
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide both email and password.", success: false, error: true });
      }
  
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User with this email does not exist.", success: false, error: true });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong Password", success: false, error: true });
      }
  
      let token;
      if (user.role === "user") {
        token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY , {
          expiresIn: "1h",
        });
      } else if (user.role === "event_organizer") {
        token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY , {
          expiresIn: "1h",
        });
      }

      
    


    
    
      const loginData={
        name:user.name,email:user.email,role:user.role,id:user._id
      }
  
     return res.cookie(user.role === "user" ? "userToken" : "eventOrgToken", token , {
      httpOnly : true,
      secure : true,
      sameSite : "None" 
    }).status(200).json({
        message: "Login successful.",
        success: true,
        error: false,
        loginData
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "There was an error during login.", success: false, error: true });
    }
  };


  const userLogout = (req, res) => {
    try {
      const cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }
      res.clearCookie("userToken",cookiesOption)
      
  
      res.status(200).json({ message: "Logout successful", success: true, error: false });
    } catch (err) {
      res.status(500).json({ message: "Error while logging out", success: false, error: true });
    }
  };
  const eventOrgLogout = (req, res) => {
    try {
     
      const cookiesOption = {
        httpOnly : true,
        secure : true,
        sameSite : "None"
    }
      res.clearCookie("eventOrgToken",cookiesOption)
  
      res.status(200).json({ message: "Logout successful", success: true, error: false });
    } catch (err) {
      res.status(500).json({ message: "Error while logging out", success: false, error: true });
    }
  };

  // console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
  // console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
  
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET,"postmessage")
  const signInWithGoogle=async(req,res)=>{
    try{
      const {code}=req.body;
      const googleRes=await oauth2Client.getToken(code);
      oauth2Client.setCredentials(googleRes.tokens);
      //const userRes=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();
    //console.log(userInfo.data)
    const {name,email}=userInfo.data;
    let user = await UserModel.findOne({ email });
    if (!user) {
      
      user = new UserModel({ name, email,role:"user" });
      await user.save();
    }
    if(user.role!=="user")
    {
      return res.status(400).json({message:"You have registered as Event Organizer With this email",succes:false,error:true})
    }

    
    const token = jwt.sign(
      { userId: user._id,role:user.role},
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "7d" } 
    );

    const loginData={
      name: user.name, email: user.email,role:user.role,id:user._id
    }
    return res.cookie("userToken",token,{httpOnly : true,
      secure : true,
      sameSite : "None" }).status(200).json({
      message: "Login success",
      loginData,
      success: true,
      error: false,
    });

    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({message:"Invalid Google Token",succes:false,error:true})
    }
  }


  const signInWithGoogleEvent=async(req,res)=>{
    try{
      const {code}=req.body;
      const googleRes=await oauth2Client.getToken(code);
      oauth2Client.setCredentials(googleRes.tokens);
      //const userRes=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();
    //console.log(userInfo.data)
    const {name,email}=userInfo.data;
    let user = await UserModel.findOne({ email });
    if (!user) {
      
      user = new UserModel({ name, email,role:"event_organizer" });
      await user.save();
    }
    if(user.role!=="event_organizer")
      {
        return res.status(400).json({message:"You have registered as User With this email",success:false,error:true})
      }
  

    
    const token = jwt.sign(
      { userId: user._id,role:user.role},
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "7d" } 
    );

    const loginData={
      name: user.name, email: user.email,role:user.role,id:user._id
    }
    return res.cookie("eventOrgToken",token,{httpOnly : true,
      secure : true,
      sameSite : "None" }).status(200).json({
      message: "Login success",
      loginData,
      success: true,
      error: false,
    });

    }
    catch(err)
    {
      console.log(err)
      res.status(500).json({message:"Invalid Google Token",succes:false,error:true})
    }
  }
  
export {signUp,login,userLogout,eventOrgLogout,signInWithGoogle,signInWithGoogleEvent}