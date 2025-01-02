//export const API_BASE_URL = "http://localhost:9000";

export const REGISTER_URL = "/api/auth/register";
export const LOGIN_URL = "/api/auth/login";
export const USER_LOGOUT_URL = "/api/auth/user-logout";
export const EVENT_ORG_LOGOUT_URL = "/api/auth/event-org-logout";
export const CREATE_API_URL = "/api/event/create-event";
export const UPDATE_EVENT_DETAILS = "/api/event/update-event";
export const ALL_EVENTS = "/api/event/all-event";
export const FILTER_EVENTS = "/api/event/events";
// export const GOOGLE_CLIENT_ID =
//   "345417449366-2s6a9ca3b2r46hsf1kou271nqcisbq72.apps.googleusercontent.com";
export const GOOGLE_API_URL = "/api/auth/google";
export const EVENT_DETAILS_URL = "/api/event/event-details";
export const EVENT_CHECKOUT_URL = "/api/event/checkout";
export const RAZORPAY_KEY_URL = "/api/event/getkey";
export const RAZORPAY_PAYMENT_VERIFICATION_URL = `${import.meta.env.VITE_API_URL}/api/event/verification`;
export const TICKET_REGISTERED_URL = "/api/event/check-registration";
export const TICKET_REGISTERED_USERS = "/api/event/get-registered-event-users";
export const TOTAL_ATTENDEES_URL = "/api/event/total-attendees";
export const TOTAL_REVENUE_URL = "/api/event/total-revenue";
export const ORGANIZER_CREATED_EVENTS = "/api/event/created-event";
