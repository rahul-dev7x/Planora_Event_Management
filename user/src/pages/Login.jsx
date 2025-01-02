import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import axios from "axios";

import { toast } from 'sonner'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/auth-slice";

import { api } from "@/config/api";
import { LOGIN_URL } from "@/config";
import GoogleAuth from "../components/shared/GoogleAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  //console.log(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    try {
      const response = await api.post(`${LOGIN_URL}`, formData);
      //console.log('API RESPONSE',response)
      const data = response.data;
      //console.log("API RESPONSE DATA",data)
      if (data.success) {
        setFormData({ email: "", password: "" });

        dispatch(setUser(response.data.loginData));
        toast.success(data.message);
      } else if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      //console.log(error)
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  useEffect(() => {
    if (user) {
      if (user.role === "user") {
        navigate("/");
      } else if (user.role === "event_organizer") {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-y-4">
      <div className="w-full bg-white max-w-md p-6 rounded-lg shadow-md">
        <h2 className="text-center font-bold text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your Passord"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300 mt-6"
          >
            Login
          </Button>
        </form>
      </div>

      <p className="text-xl font-semibold mt-2">Or</p>
      <GoogleAuth />
    </div>
  );
};

export default Login;
