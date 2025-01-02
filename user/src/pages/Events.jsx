import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllEventsCard from "./AllEventsCard";
import { setAllEvents, setFilter } from "../redux/all-events";
import { ALL_EVENTS } from "../config";
import { api } from "../config/api";

const Events = () => {
  const all_events = useSelector((state) => state.event.all_events);

 
  let uniqueLocations = [
    ...new Set(all_events.map((event) => event.location)),
  ];
  const dispatch = useDispatch();
  const [filterss, setFilterss] = useState({
    search_keyword: "",
    date: "",
    location: "",
    ticket_price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilterss((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    //console.log({ ...filterss, [name]: value });
  };
  const fetchAllEvent = async () => {
    try {
      const response = await api.get(ALL_EVENTS);
      //console.log('api_response_all_event',response)
      if (response.data.success) {
        dispatch(setAllEvents(response.data.events));
      }
    } catch (err) {
      console.log("Fetching_all_event_err", err);
    }
  };
  useEffect(() => {
    fetchAllEvent();
    dispatch(setFilter(filterss));
  }, [filterss,all_events,uniqueLocations]);
  return (
   





    <div className="flex min-h-screen">
  
  <div className="w-71 flex flex-col px-4 py-3 shadow-lg rounded-lg fixed left-0 top-16 bottom-0 overflow-y-auto border-r-2 border-gray-200 bg-white z-10">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>


    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search
      </label>
      <input
        type="text"
        name="search_keyword"
        placeholder="Search events..."
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filterss.search_keyword}
        onChange={handleInputChange}
      />
    </div>


    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Date
      </label>
      <input
        type="date"
        name="date"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filterss.date}
        onChange={handleInputChange}
      />
    </div>


    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Location
      </label>
      <div className="space-y-3">
        {uniqueLocations.map((location, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name="location"
              value={location}
              id={`location-${index}`}
              className="mr-2"
              onChange={handleInputChange}
            />
            <label htmlFor={`location-${index}`} className="text-sm text-gray-700">
              {location}
            </label>
          </div>
        ))}
      </div>
    </div>


    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Ticket Price
      </label>
      <select
        name="ticket_price"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={filterss.ticket_price}
        onChange={handleInputChange}
      >
        <option value="">Select</option>
        <option value="0-500">0-500 Rs</option>
        <option value="500-1000">500-1000 Rs</option>
        <option value="1000-2000">1000-2000 Rs</option>
        <option value="2000+">2000+ Rs</option>
      </select>
    </div>
  </div>

  
  <div className="flex-1 flex flex-col ml-60 px-6 bg-gray-50 ">
    <div className="">
      <AllEventsCard fetchAllEvent={fetchAllEvent}/>
    </div>
  </div>
</div>

  );
};

export default Events;
