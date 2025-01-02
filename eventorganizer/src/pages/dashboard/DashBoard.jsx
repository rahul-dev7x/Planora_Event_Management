import { useEffect } from "react";
import { FaCalendarAlt, FaDollarSign, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/config/api";
import {
  ORGANIZER_CREATED_EVENTS,
  TOTAL_ATTENDEES_URL,
  TOTAL_REVENUE_URL,
} from "../../config";
import {
  setTotalAttendees,
  setTotalEvents,
  setTotalRevenue,
} from "../../redux/dashboard";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { totalEvents, totalAttendees, totalRevenue } = useSelector(
    (state) => state.dashboard
  );
  console.log("Total Events:", totalEvents);
  console.log("Total Attendees:", totalAttendees);
  console.log("Total Revenue:", totalRevenue);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsResponse = await api.get(ORGANIZER_CREATED_EVENTS);
        const attendeesResponse = await api.get(TOTAL_ATTENDEES_URL);
        const revenueResponse = await api.get(TOTAL_REVENUE_URL);

        console.log("Events API Response:", eventsResponse);
        console.log("Attendees API Response:", attendeesResponse);
        console.log("Revenue API Response:", revenueResponse);

        if (eventsResponse.data.success) {
          dispatch(setTotalEvents(eventsResponse.data.totalEvents));
        }
        if (attendeesResponse.data.success) {
          dispatch(setTotalAttendees(attendeesResponse.data.uniqueUsers));
        }
        if (revenueResponse.data.success) {
          dispatch(setTotalRevenue(revenueResponse.data.totalRevenue));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between gap-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-gray-900">
              {totalEvents || "0"}
            </h3>
            <p className="text-gray-500 text-sm">Total Events</p>
            <p className="text-green-500 text-xs mt-1">+5% This Month</p>
          </div>
          <div className="bg-blue-100 text-blue-600 p-4 rounded-full flex items-center justify-center">
            <FaCalendarAlt size={24} />
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between gap-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-gray-900">
              {totalAttendees || "0"}
            </h3>
            <p className="text-gray-500 text-sm">Total Attendees</p>
            <p className="text-green-500 text-xs mt-1">+2.5% This Month</p>
          </div>
          <div className="bg-green-100 text-green-600 p-4 rounded-full flex items-center justify-center">
            <FaUsers size={24} />
          </div>
        </div>

        
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between gap-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex flex-col items-start">
            <h3 className="text-2xl font-semibold text-gray-900">
              ₹{totalRevenue || "0"}
            </h3>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-green-500 text-xs mt-1">+8% This Month</p>
          </div>
          <div className="bg-yellow-100 text-yellow-600 p-4 rounded-full flex items-center justify-center">
            <FaDollarSign size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
