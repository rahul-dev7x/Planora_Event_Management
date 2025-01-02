import dataUri from "datauri/parser.js";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import Event from "../models/event.model.js";
import instance from "../config/razorpay.js";
import TicketModel from "../models/ticket.model.js";
import crypto from "crypto"


const dUri = new dataUri();

const createEvent = async (req, res) => { 
    try {
        const { name, description, location, date, ticket_price } = req.body;
        const userid = req.userIdd;

        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded", success: false
            });
        }
        const fileData = dUri.format(path.extname(file.originalname).toString(), file.buffer);
        if (!fileData || !fileData.content) {
            return res.status(400).json({
                message: "File Content is not available", success: false, error: true
            });
        }
        const result = await cloudinary.uploader.upload(fileData.content, {
            folder: "Event_Image"
        });

        const event_url = result.secure_url;

        const newEvent = new Event({
            name,
            description,
            location,
            date,
            ticket_price,
            image: event_url,
            organizer: userid
        });

        await newEvent.save();

        return res.status(201).json({
            message: "Event created successfully",
            success: true,
            error: false,
            event: newEvent
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "There is an error while creating event", success: false, error: true });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, description, location, date, ticket_price } = req.body;

        const event = await Event.findByIdAndUpdate(eventId, {
            ...(name && { name: name }),
            ...(description && { description: description }),
            ...(location && { location: location }),
            ...(date && { date: date }),
            ...(ticket_price && { ticket_price: ticket_price })
        }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false, error: true });
        }

        return res.status(200).json({ message: "Event updated successfully", success: true, event });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error updating event", success: false, error: true });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found", success: false, error: true });
        }

        return res.status(200).json({ message: "Event deleted successfully", success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error deleting event", success: false, error: true });
    }
};

const eventsCreatedByEventOrg = async (req, res) => { 
    try {
        const userid = req.userIdd;
        const events = await Event.find({ organizer: userid }).sort({createdAt:-1});
        const totalEvents=events.length;
        res.status(200).json({ message: "Events Found Successfully", success: true, error: false, events: events,totalEvents });

    } catch (err) {
        res.status(500).json({ message: "Error finding events", success: false, error: true });
    }
};

const allEvents = async (req, res) => { 
    try {
        const currentTime=new Date().toISOString().split("T")[0];
       // console.log(currentTime.toISOString().split("T")[0])
        const events = await Event.find({date:{$gte:currentTime}}).sort({date:1});
        res.status(200).json({ message: "Events Found Successfully", success: true, error: false, events: events });

    } catch (err) {
        res.status(500).json({ message: "Error finding events", success: false, error: true });
    }
};

const getEventById=async(req,res)=>{
try{
const eventId=req.params.id;
//console.log(eventId);
const event=await Event.find({_id:eventId});
return res.status(200).json({message:"Found event Details",success:true,error:false,event})
}
catch(err)
{
    return res.status(500).json({message:"err finding event details",success:false,error:true})
}
}


const checkOut=async(req,res)=>{
    try{
        //console.log("BODY_API",req.body);
        //const {ticket_amount}=req.body;
        const {userId,eventId,ticketPrice}=req.body;
const options={
    amount:Number(ticketPrice*100),
    currency:"INR"
}
const order=await instance.orders.create(options);
const newTicket=new TicketModel({
    event:eventId,
    user:userId,
    order_id:order.id,
    payment_status:"pending"
})
await newTicket.save()
//console.log(order);
return res.status(200).json({message:"Order checkout",success:true,error:false,order})
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({message:"Err while checkout payment",sucess:false,error:true})
    }
}

const paymentVerification=async(req,res)=>{
    try{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    //console.log("success_body",req.body)
    const body=razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature=crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) .update(body.toString())
    .digest("hex");
//     console.log("expectedSignature:", expectedSignature);
// console.log("razorpay_signature:", razorpay_signature);

    const isAuthenticated=expectedSignature === razorpay_signature;
    //console.log("is_authenticated",isAuthenticated)
    if(!isAuthenticated)
    {
        await TicketModel.findOneAndDelete({ order_id: razorpay_order_id });
      return res.status(400).json({ success: false, message: "Invalid signature. Order has been removed." });
    }
    const ticket=await TicketModel.findOneAndUpdate({order_id: razorpay_order_id },{payment_id:razorpay_payment_id,payment_status:"completed"},{new:true}).populate("event").populate("user")
    if (!ticket) {
        return res.status(404).json({ success: false, message: "Ticket not found" });
      }

    //console.log("payment_verification",req.body)
    res.redirect(`${process.env.USER_FRONTEND_URL}/upcoming-events`)
        //res.status(200).json({message:"verified payment",success:true,error:false,ticket})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"err while verifying payment",error:true,success:false})
    }
}


const checkRegistration=async(req,res)=>{
    try{
        const eventId=req.params.id;
        const userId=req.userRegisterId;
        //console.log(eventId)
        const existingTicket=await TicketModel.findOne({event:eventId,user:userId,payment_status:"completed"});
        if (existingTicket) {
            return res.status(200).json({ registered: true });
        }

        return res.status(200).json({ registered: false });

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"Checked Registration Success",success:false,error:true})
    }
}

const registeredUsersForEvent=async(req,res)=>{
    try{
const eventId=req.params.id;
const tickets=await TicketModel.find({event:eventId,payment_status:"completed"}).populate("user");
const registeredUsers=tickets.map(tickets=>({name:tickets.user.name,email:tickets.user.email}))
return res.status(200).json({message:"registered users for a event found successfully",success:true,error:false,registeredUsers})
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message:"err in getting registered users",success:false,erroe:true})
    }
}



const totalAttendees=async(req,res)=>{
    try{
        const loggedInUserId=req.userIdd;
        const events=await Event.find({organizer:loggedInUserId});
        // if (events.length===0)
        // {
        //     return res.status(400).json({message:"No events found for this user",success:false,error:true});
        // }
        const eventId=events.map(event=>event._id);
        const tickets=await TicketModel.find({event:eventId,payment_status:
"completed"}).populate("user");
const attendees=tickets.map(ticket=>ticket.user._id);
//const uniqueUserIds=[...new Set(attendees)];
const uniqueUsers=attendees.length;
//console.log(attendees)
        return res.status(200).json({message:"successfully found attendees",success:true,error:false,uniqueUsers})

    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({message:"Error while finding total Attendees",success:false,error:true})
    }
}


const totalRevenue=async(req,res)=>{
    try{
        const registeredUser=req.userIdd;
        const events=await Event.find({organizer:registeredUser});
        // if (events.length===0)
        //     {
        //         return res.status(400).json({message:"No events found for this user",success:false,error:true});
        //     }
            const eventId=events.map(event=>event._id);
            const tickets=await TicketModel.find({event:eventId,payment_status:
    "completed"}).populate("event");
    const eventDetails=tickets.map(ticket=>ticket.event.ticket_price);
    const totalRevenue=eventDetails.reduce((sum,num)=>sum+num,0)
    //console.log(eventDetails)
        return res.status(200).json({message:"Found total revenue",success:true,error:false,totalRevenue})

    }
    catch(err)
    {
        return res.status(500).json({message:"Error while finding total revnue",success:false,error:true})
    }
}






export { createEvent, updateEvent, deleteEvent, eventsCreatedByEventOrg, allEvents ,getEventById,checkOut,paymentVerification,checkRegistration,registeredUsersForEvent,totalRevenue,totalAttendees
};