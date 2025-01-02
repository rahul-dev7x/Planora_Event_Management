import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";


import EventsUser from "../pages/Events";
import AllEventDetails from "../pages/AllEventsDetails";
import { GoogleOAuthProvider } from '@react-oauth/google';
//import { GOOGLE_CLIENT_ID } from "../config";




const router =createBrowserRouter([{
    path:"/",
    element:<App/>,
    children:[
        {
        path:"",
        element:<Home/>
        },
        {
            path:"register",
            element:(
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Signup/>
            </GoogleOAuthProvider>)
        },
        {
            path:"login",
            element:(<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Login/>
            </GoogleOAuthProvider>)
        },
        {
            path:"upcoming-events",
            element:<EventsUser/>,

        },
        {
            path:"event-details/:id",
            element:<AllEventDetails/>
        }
        
    ]
}])



export default router;