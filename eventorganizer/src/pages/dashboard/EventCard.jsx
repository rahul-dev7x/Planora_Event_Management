import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { FiMapPin } from "react-icons/fi";
import { formDate } from './../../config/dateStructure';

const EventCard = ({orgEvents}) => {
  //const dispatch = useDispatch();

  //console.log(orgEvents);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await api.get(ORGANIZER_CREATED_EVENTS);
  //       //console.log("org_events",response)
  //       if (response.data.success) {
  //         dispatch(setOrganizerEvents(response.data.events));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {orgEvents.map((event, index) => (
        <div
          key={index}
          className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        >
          <div className="h-48 w-full overflow-hidden">
            <img
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-indigo-600 uppercase">
                Featured
              </span>
              <span className="text-sm text-gray-500">{formDate(event.date)}</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate">
              {event.name}
            </h2>

            <p className="text-gray-600 mt-2 text-sm">
              {event.description.length > 50
                ? `${event.description.slice(0, 50)}`
                : event.description}
            </p>
          </div>

          <div className="p-4 bg-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500 flex items-center">
              <FiMapPin className="w-4 h-4 text-gray-400 mr-1" />{" "}
              {event.location}
            </p>
            <p className="text-indigo-600 font-bold">₹ {event.ticket_price}</p>
          </div>

          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => navigate(`/dashboard/event-details/${event._id}`)}
          >
            View Event
          </Button>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
