import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { REGISTER_URL } from "@/config";
import { toast } from 'sonner'
import { Link, useNavigate } from "react-router-dom";
import { api } from "@/config/api";
import GoogleAuth from "../components/shared/GoogleAuth";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "event_organizer",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(REGISTER_URL, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/auth/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
   
    <div className="flex items-center justify-center min-h-screen  flex-col gap-y-6">
  <div className="w-full bg-white max-w-md p-6 rounded-lg shadow-md">
    <h2 className="text-center font-bold text-2xl mb-4">Register</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="name" className="block mb-2 text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <p className="flex justify-end mt-2">Already have an account? <Link to="/auth/login" className="ml-1 hover:underline">Login</Link></p>
      
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300 mt-6"
      >
        Register
      </Button>
    </form>
  </div>

  <p className="font-semibold text-gray-800 text-sm ">Or</p>
  <GoogleAuth />
</div>

  );
};

export default Signup;
