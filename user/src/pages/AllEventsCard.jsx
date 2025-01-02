import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {useSelector } from "react-redux";
import { useEffect, useState } from "react";


import { FiMapPin } from "react-icons/fi";
import { formDate } from "./../config/dateStructure";

const AllEventsCard = ({fetchAllEvent}) => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();

 const all_events = useSelector((state) => state.event.all_events);
  //console.log("all_events_slice",all_events)
  const filters = useSelector((state) => state.event.filters);
  //console.log(filters);
  const [filterEvents, setFilterEvents] = useState(all_events);
  // const fetchAllEvent = async () => {
  //   try {
  //     const response = await api.get(ALL_EVENTS);
  //     //console.log('api_response_all_event',response)
  //     if (response.data.success) {
  //       dispatch(setAllEvents(response.data.events));
  //     }
  //   } catch (err) {
  //     console.log("Fetching_all_event_err", err);
  //   }
  // };
  useEffect(() => {
    fetchAllEvent();
  }, []);
  useEffect(() => {
    if (filters) {
      let filteredEvents = all_events;

      if (filters.search_keyword) {
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.name
              .toLowerCase()
              .includes(filters.search_keyword.toLowerCase()) ||
            event.location
              .toLowerCase()
              .includes(filters.search_keyword.toLowerCase())
        );
      }

      if (filters.location) {
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.location.toLowerCase() === filters.location.toLowerCase()
        );
      }

      if (filters.ticket_price) {
        const [minPrice, maxPrice] = filters.ticket_price
          .split("-")
          .map(Number);
        filteredEvents = filteredEvents.filter(
          (event) =>
            event.ticket_price >= minPrice &&
            (maxPrice ? event.ticket_price <= maxPrice : true)
        );
      }

      if (filters.date) {
        const filterDate = new Date(filters.date).toISOString().split("T")[0];
        filteredEvents = filteredEvents.filter((event) => {
          const eventDate = new Date(event.date).toISOString().split("T")[0];
          return eventDate === filterDate;
        });
      }

      setFilterEvents(filteredEvents);
    } else {
      setFilterEvents(fetchAllEvent);
    }
  }, [all_events, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filterEvents.length > 0 ? (
          filterEvents.map((event) => (
            <div
              key={event._id}
              className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="h-48 w-full overflow-hidden ">
                <img
                  src={event.image}
                  alt={event.name}
                  className="h-full w-full object-cover transform group-hover:scale-105 transition-transform duration-300 "
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-indigo-600 uppercase">
                    Featured
                  </span>
                  <span className="text-sm text-gray-500">
                    {formDate(event.date)}
                  </span>
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
                <p className="text-indigo-600 font-bold">
                  ₹ {event.ticket_price}
                </p>
              </div>

              <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-500"
                onClick={() => navigate(`/event-details/${event._id}`)}
              >
                View Details
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No events available.</p>
        )}
      </div>
    </div>
  );
};

export default AllEventsCard;
