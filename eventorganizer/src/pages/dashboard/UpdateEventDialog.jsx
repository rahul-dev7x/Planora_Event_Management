import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/config/api"; // Assuming you have an API utility
import { UPDATE_EVENT_DETAILS } from "../../config";
import axios from "axios";
import { toast } from 'sonner'

const UpdateEventDialog = ({ open, onClose, event,eventDetails,getAttendees }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    ticket_price: "",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || "",
        description: event.description || "",
        location: event.location || "",
        date: event.date || "",
        ticket_price: event.ticket_price || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //console.log(formData)

  const handleSubmit = async () => {
    try {
      const response = await api.put(
        `${UPDATE_EVENT_DETAILS}/${event._id}`,
        formData
      );

      //console.log(response);
      if (response.data.success) {
        toast.success(response.data.message)
        onClose();
        eventDetails();
        getAttendees()
      } else {
        console.error("Failed to update event:", response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Modify the details of your event below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Event Name"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event Description"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event Location"
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Event Date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label htmlFor="ticket_price">Ticket Price</Label>
            <Input
              id="ticket_price"
              name="ticket_price"
              value={formData.ticket_price}
              onChange={handleChange}
              placeholder="Ticket Price"
              type="number"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEventDialog;
