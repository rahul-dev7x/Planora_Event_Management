
import jwt from 'jsonwebtoken';




const isUser=async(req,res,next)=>{
    try{
const token=req.cookies?.userToken ;
//console.log(token);
if(!token)
{
    return res.status(400).json({message:"You Are Not AUthenticated",success:false,error:true})
}
 const decode = jwt.verify(token,process.env.JWT_SECRET_KEY ) ;
 //console.log(decode)
if(decode.role==="user")
{
    req.userRegisterId=decode.userId
}
else
{
    return res.status(403).json({message:"Forbidden: Not an User",success:false,error:true})
}
   
next()}
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Error in isUser middleware",success:false,error:true})
    }
}
export default isUser;