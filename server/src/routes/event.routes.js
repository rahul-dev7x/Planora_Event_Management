
import { allEvents, checkOut, checkRegistration, createEvent, deleteEvent, eventsCreatedByEventOrg,  getEventById,  paymentVerification,  registeredUsersForEvent,  totalAttendees,  totalRevenue,  updateEvent } from "../controller/event.controller.js";
import isEventOrg from "../middleware/isEventOrg.js";
import upload from "../config/multer.js";
import express  from 'express';
import isUser from './../middleware/isUser.js';



const route = express.Router();


route.post("/create-event", 
    isEventOrg, upload.single("image"), 
    createEvent)
route.put("/update-event/:id", 
    isEventOrg, 
    updateEvent)
route.delete("/delete-event", 
    isEventOrg,
    deleteEvent)

route.get("/created-event", 
    isEventOrg,
    eventsCreatedByEventOrg);
    route.get("/event-details/:id",getEventById);
    route.get("/all-event",allEvents)
route.post("/checkout",checkOut)
route.get("/getkey",(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_KEY_ID})
})
route.post("/verification",paymentVerification)
    route.get("/check-registration/:id",isUser,checkRegistration);
    route.get("/get-registered-event-users/:id",registeredUsersForEvent);
    route.get("/total-attendees",isEventOrg,totalAttendees);
    route.get("/total-revenue",isEventOrg,totalRevenue);
export default route;