import express from "express";
import { eventOrgLogout, login,  signInWithGoogle,  signInWithGoogleEvent,  signUp, userLogout } from "../controller/user.cotroller.js";


const route=express.Router();


route.post("/register",
    signUp)
route.post("/login",login)
route.post("/user-logout",
    userLogout)
route.post("/event-org-logout",
    eventOrgLogout)
route.post("/google",signInWithGoogle)
route.post("/google/event",signInWithGoogleEvent)

export default route;