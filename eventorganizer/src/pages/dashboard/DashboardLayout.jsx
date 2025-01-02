import { Outlet, Link } from "react-router-dom";
import { FaRegCalendarAlt, FaTachometerAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { EVENT_ORG_LOGOUT_URL } from "@/config";
import { useDispatch } from "react-redux";

import { setUser } from "@/redux/auth-slice";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { api } from "@/config/api";
import { toast} from 'sonner'
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    const response = await api.post(`${EVENT_ORG_LOGOUT_URL}`);
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(setUser(null));
      navigate("/login");
    }
    else{
      toast.error(response.data.message)
    }
  };

  return (
    <div className="flex h-screen overflow-hidden ">
      
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col justify-between border-r border-gray-200">
      <div>
        <h1 className="text-4xl font-semibold text-gray-900 text-center mb-12">
          Planora
        </h1>

        <div className="border-t border-gray-200 my-6 w-full"></div>

        <ul className="space-y-6">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center space-x-4 text-gray-700 hover:text-indigo-600 transition-colors duration-200 "
            >
              <FaTachometerAlt size={22} className="text-gray-500" />
              <span className="text-lg font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/events"
              className="flex items-center space-x-4 text-gray-700 hover:text-indigo-600 transition-colors duration-200 "
            >
              <FaRegCalendarAlt size={22} className="text-gray-500" />
              <span className="text-lg font-medium">Events</span>
            </Link>
          </li>
        </ul>
      </div>

      {user && (
        <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-6">
          <Avatar className="w-12 h-12 bg-gray-300 text-xl text-gray-600">
            <AvatarFallback>
              {user.name.split(" ")[0]?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg text-gray-800">
              {user.name.split(" ")[0]}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      )}
    </aside>

      <div className="flex-1 flex flex-col bg-gray-100">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <h2 className="text-2xl text-gray-800 font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="text-lg text-gray-700">
              Welcome {user?.name.split(" ")[0]}
            </span>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
              onClick={user ? handleLogout : undefined}
            >
              {user ? (
                <span>Logout</span>
              ) : (
                <Link to="/login" className="text-white">
                  Login
                </Link>
              )}
            </button>
          </div>
        </header>

        <main className=" flex-1 p-4 overflow-y-auto">
          <Outlet />
          
          
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;
