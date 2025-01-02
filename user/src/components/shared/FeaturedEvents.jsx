import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const FeaturedEvents = () => {
  const all_events  = useSelector((state) => state.event.all_events);

  const limitedEvents = all_events.slice(0, 3);
  console.log(limitedEvents);
  const formDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Events
        </h1>
        <p className="text-gray-600 mt-2">
          Discover amazing events happening around you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {limitedEvents.map((event) => (
          <Link
            to={`/event-details/${event._id}`}
            key={event._id}
            
            className="group bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="h-48 w-full overflow-hidden">
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
                  ? `${event.description.slice(0, 50)}...`
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
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link to="/upcoming-events">
          <Button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
            View All Events
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedEvents;
