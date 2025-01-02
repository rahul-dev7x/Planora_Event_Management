import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const headerData = [
  { id: 1, value: "10K+", label: "Events Hosted" },
  { id: 2, value: "50K+", label: "Happy Attendees" },
  { id: 3, value: "98%", label: "Success Rate" },
];

const Header = () => {
  return (
    <header className="flex items-center flex-col bg-gray-50 py-20 px-6 min-h-screen ">
      <div className="text-center max-w-2xl">
        <h1 className="text-[60px] md:text-5xl font-bold text-gray-900 leading-tight">
          Create Unforgettable{" "}
          <span className="text-indigo-600">Experiences</span>
        </h1>
        <p className="mt-4 text-gray-600 text-[60px] md:text-xl">
          Transform your ideas into extraordinary events that leave lasting
          impressions.
        </p>
      </div>

      <div className="mt-8 flex space-x-4">
        <Link to="/login">
          <Button className="px-6 py-3 bg-indigo-600 text-white text-[18px] font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
            Create Event
          </Button>
        </Link>
        <Link to="/upcoming-events">
          <Button className="px-6 py-3 bg-gray-100 text-gray-900 font-medium text-[18px] rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
            Browse Events
          </Button>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {headerData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-md rounded-lg py-6 px-4"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-indigo-600">
              {data.value}
            </h3>
            <p className="mt-2 text-gray-600 text-lg md:text-xl">
              {data.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
