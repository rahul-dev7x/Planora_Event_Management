import { createBrowserRouter, Navigate } from "react-router-dom";

import Signup from "@/pages/Signup";
import Login from "@/pages/Login";

import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Events from "@/pages/dashboard/Events";
import EventDetails from "../pages/dashboard/EventDetails";

import DashBoard from "../pages/dashboard/DashBoard";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Auth from "../layouts/auth";
import ProtectedRoute from "../protectedroute/ProtectedRoute";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />
  },
  {
    path: "/auth", 
    element: <Auth />,
    children: [
      {
        path: "login",
        element: (
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Login />
          </GoogleOAuthProvider>
        ),
      },
      {
        path: "register",
        element: (
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Signup />
          </GoogleOAuthProvider>
        ),
      },
    ],
  },
  
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "event-details/:id",
        element: <EventDetails />,
      },
      {
        path: "",
        element: <DashBoard />,
      },
    ],
  },
]);

export default router;
