import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "./../config/api";
import {
  EVENT_CHECKOUT_URL,
  EVENT_DETAILS_URL,
  RAZORPAY_KEY_URL,
  RAZORPAY_PAYMENT_VERIFICATION_URL,
  TICKET_REGISTERED_URL,
} from "../config/index";
import { useDispatch, useSelector } from "react-redux";
import { setSingleEvent } from "../redux/all-events";
import { Button } from "@/components/ui/button";
import { formDate } from "../config/dateStructure";

const AllEventDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const single_event = useSelector((state) => state.event.single_event);
  const { user } = useSelector((state) => state.auth);
  const [isRegistered, setIsRegistered] = useState(false);

  const eventId = params.id;

  useEffect(() => {
    const eventDetails = async () => {
      try {
        const response = await api.get(`${EVENT_DETAILS_URL}/${eventId}`);
        const data = response.data;
        if (data.success) {
          dispatch(setSingleEvent(data.event));
        }
      } catch (err) {
        console.log(err);
      }
    };
    eventDetails();
  }, [eventId, dispatch]);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const {
          data: { registered },
        } = await api.get(`${TICKET_REGISTERED_URL}/${eventId}`);
        if (registered) {
          setIsRegistered(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkRegistration();
  }, [eventId]);

  
  if (!single_event || single_event.length === 0) {
    return (
      <p className="text-center text-gray-500">Loading event details...</p>
    );
  }

  const event = single_event[0]; 

  const payload = {
    userId: user?.id,
    eventId: event._id,
    ticketPrice: event.ticket_price,
  };

  const checkOutHandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const { data: key } = await api.get(RAZORPAY_KEY_URL);
    const {
      data: { order },
    } = await api.post(EVENT_CHECKOUT_URL, payload);
    console.log(order);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Planora",
      description: "Streamlined Event Management",
      image:
        "https://zenprospect-production.s3.amazonaws.com/uploads/pictures/66e64858d16aa70001cd2d8e/picture",
      order_id: order.id,
      callback_url: RAZORPAY_PAYMENT_VERIFICATION_URL,
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-6">
        <div className="flex justify-center items-center mb-6 md:mb-0">
          <img
            src={event.image}
            alt={event.name}
            className="w-[40rem] h-[30rem] z-[-10] object-cover rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300 ease-in-out">
              {event.name}
            </h1>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600">{event.description}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Date</h3>
            <p className="text-gray-600">{formDate(event.date)}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600">{event.location}</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-700">Ticket Price</h3>
            <p className="text-gray-600">₹ {event.ticket_price}</p>
          </div>

          <div className="mt-6">
            <Button
              disabled={isRegistered}
              onClick={() => (user ? checkOutHandler() : navigate("/login"))}
              className={`w-full py-3 text-lg font-semibold rounded-lg transition duration-300 ease-in-out ${
                isRegistered
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isRegistered ? "Already Registered" : "Register for Event"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEventDetails;
