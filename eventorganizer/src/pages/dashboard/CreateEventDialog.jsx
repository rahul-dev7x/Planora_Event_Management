import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { CREATE_API_URL } from "@/config";
import axios from "axios";
import { toast} from "sonner";
import { api } from "@/config/api";


const CreateEventDialog = ({ open, onClose,fetchEvents }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    ticket_price: "",
    image: null 

  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleImageChange = (e) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('ticket_price', formData.ticket_price);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      const response = await api.post(CREATE_API_URL, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      console.log(response);
      const data = response.data;
      if (data.success) {
        setFormData({
          name: "",
          description: "",
          location: "",
          date: "",
          ticket_price: "",
          image:null
        })
        onClose();
        toast.success(data.message);
        fetchEvents();
      }
      else if (data.error) {
        toast.error(data.message)
      }


    }
    catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }

    }
  }
  
  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new event.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="eventName">Event Name</Label>
              <Input id="name" placeholder="Enter event name" required name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter event description" value={formData.description}
                required
                name="description"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter event location" required name="location" value={formData.location} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="eventImage">Image</Label>
              <Input id="eventImage" type="file" required name="file" onChange={handleImageChange} />
            </div>
            <div>
              <Label htmlFor="ticket_rice">Ticket Price</Label>
              <Input
                id="ticket_rice"
                type="number"
                placeholder="Enter ticket price"
                name="ticket_price"
                required value={formData.ticket_price} onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>


            <div className="flex justify-end mt-6">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="ml-2">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateEventDialog
