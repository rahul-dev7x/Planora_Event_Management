import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true},
    payment_status:{type:String,enum:["pending","completed"],default:"pending"},
     payment_id: { type: String }, 
    order_id: { type: String },   
}, { timestamps: true });

const TicketModel=mongoose.model('Ticket', ticketSchema);
 export default TicketModel;