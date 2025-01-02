import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description:{type:String,required:true},
    location: { type: String, required: true },
    date: { type: String, required: true },
    ticket_price: { type: Number, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    
  },{timestamps:true});
  //eventSchema.index({ name: 'text', description: 'text' });
  const Event = mongoose.model('Event', eventSchema);
  export default Event;