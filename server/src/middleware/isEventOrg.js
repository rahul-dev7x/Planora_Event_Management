
import jwt from 'jsonwebtoken';




const isEventOrg=async(req,res,next)=>{
    try{
const token=req.cookies?.eventOrgToken ;
//console.log(token);
if(!token)
{
    return res.status(400).json({message:"You Are Not AUthenticated",success:false,error:true})
}
 const decode = jwt.verify(token,process.env.JWT_SECRET_KEY ) ;
if(decode.role==="event_organizer")
{
    req.userIdd=decode.userId
}
else
{
    return res.status(403).json({message:"Forbidden: Not an event organizer",success:false,error:true})
}
   
next()}
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Error in isEventOrg middleware",success:false,error:true})
    }
}
export default isEventOrg;