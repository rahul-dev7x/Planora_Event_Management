import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback } from "../ui/avatar";

import { toast } from 'sonner'
import { setUser } from "@/redux/auth-slice";
import { api } from "@/config/api";
import { USER_LOGOUT_URL } from "@/config";
import { useEffect, useState } from "react";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  //console.log(user)
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await api.post(`${USER_LOGOUT_URL}`, {
      withCredentials: true,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      dispatch(setUser(null));
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`bg-white w-full  ${
        isScrolled
          ? "fixed top-0 bg-white shadow-lg scroll-smooth"
          : "relative bg-transparent border-b-[1px]"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
        <Link to="/" className="text-[24px] font-bold text-[#4f46e5]">
          Planora
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/upcoming-events"
            className="text-[#374151] text-[16px] hover:text-gray-900 transition-colors duration-200"
          >
            Featured Events
          </Link>
          {user?.role === "user" ? (
            <>
              <Avatar className="cursor-pointer">
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
