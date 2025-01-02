import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import UpdateEventDialog from "./UpdateEventDialog";
import { api } from "../../config/api";
import { setAttendeesOrgEvent, setSingleOrgEvent } from "../../redux/event-organizer-events";
import { EVENT_DETAILS_URL, TICKET_REGISTERED_USERS } from "../../config";

const EventDetails = () => {
  const { id: eventId } = useParams();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const attendees_info  = useSelector((state) => state.orgEvent.attendees_info );
  console.log("attendees_info", attendees_info);
  const single_org_event = useSelector(
    (state) => state.orgEvent.single_org_event
  );


  const eventDetails = async () => {
    try {
      const response = await api.get(`${EVENT_DETAILS_URL}/${eventId}`);
      const data = response.data;
      if (data.success) {
        dispatch(setSingleOrgEvent(data.event));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
   
    eventDetails();
  }, [eventId, dispatch]);

  const getAttendees = async () => {
    try {
      const { data } = await api.get(`${TICKET_REGISTERED_USERS}/${eventId}`);
      if (data.success) {
        dispatch(setAttendeesOrgEvent(data.registeredUsers));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    
    getAttendees();
  }, [eventId,attendees_info, dispatch]);

  if (!single_org_event || single_org_event.length === 0) {
    return <p className="text-center text-gray-500">Loading event details...</p>;
  }

  const event = single_org_event[0];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
        {event.image && (
          <div className="flex justify-center items-center mb-6 md:mb-0">
            <img
              src={event.image}
              alt={event.name}
              className="w-[40rem] h-[30rem] object-cover rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>
        )}

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out">
              {event.name}
            </h1>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Date</h3>
            <p className="text-gray-600">{event.date}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600">{event.location}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out"
              onClick={() => setIsOpen(true)}
            >
              Edit Event
            </Button>
          </div>
        </div>
      </div>

      <UpdateEventDialog
        key={event._id}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        event={event}
        eventDetails={eventDetails}
        getAttendees={getAttendees}

      />

      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Attendees</h3>
        <div>
          {attendees_info?.length > 0 ? (
            <div className="space-y-4">
              {attendees_info.map((attendee, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                >
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarFallback className="bg-gray-600 text-white font-bold">
                      {attendee.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {attendee.name}
                    </h4>
                    <p className="text-sm text-gray-600">{attendee.email}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600 text-center py-4">
              <p>No one has registered for this event yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
