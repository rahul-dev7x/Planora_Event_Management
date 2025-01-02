import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "@/config/api";
import { GOOGLE_API_URL } from "../../config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/auth-slice";
import { toast } from "sonner";
const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseGoogle = async (authResponse) => {
    try {
      //console.log(authResponse)
      if (authResponse.code) {
        const { code } = authResponse;
        const response = await api.post(GOOGLE_API_URL, { code });
        //console.log("login_api",response.data)
        if (response.data.success) {
          dispatch(setUser(response.data.loginData));
          navigate("/");
          toast(response.data.message);
        }
        else
        {
          toast.error(response.data.message)
        }
        
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };
  const login = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });
  return (
    <div className="flex justify-center items-center">
      <div className="flex rounded-full shadow-lg bg-white p-4 w-full max-w-[400px] items-center cursor-pointer hover:shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="flex justify-center items-center gap-x-4 w-full text-center px-4" onClick={login}>
          <FcGoogle size={30} />
          <p className="text-lg text-gray-800 font-semibold tracking-wide">
            Continue with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuth;
