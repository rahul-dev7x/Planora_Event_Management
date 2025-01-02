
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="flex min-h-screen">
    
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Planora!</h1>
          <p className="mt-4 text-lg">
            Manage events effortlessly and connect with others. Let's make it amazing together!
          </p>
          
        </div>
      </div>

   
      <div className="w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
         
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
