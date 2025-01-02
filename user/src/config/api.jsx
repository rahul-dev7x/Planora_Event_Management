import axios from "axios";
//import { API_BASE_URL } from ".";


//console.log(import.meta.env.VITE_API_URL)
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
