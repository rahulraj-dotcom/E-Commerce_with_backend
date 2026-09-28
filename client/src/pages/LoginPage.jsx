import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/authContext";
import api from "../apis/apis";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const {setUser, setAccessToken} = useAuth()

  const navigate = useNavigate()

  const loginSubmitHandler = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      console.log(response.data);

      const user = response.data.data.user;

      const accessToken = response.data.data.accessToken

      setUser(user)
      setAccessToken(accessToken)

      navigate("/")

      reset();

    } catch (error) {
      console.log("error in login API", error);
    }
  };

  return (
    <main className="bg-black/50 h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(loginSubmitHandler)}
        className="p-10 bg-orange-600 flex flex-col gap-5 w-135 text-white rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-5">Login here...</h1>
        <input
          {...register("email")}
          className="border-2 rounded outline-0 placeholder:text-gray-200  border-gray-200 px-5 py-2 font-bold"
          type="email"
          placeholder="Enter your email"
        />
        <input
          {...register("password")}
          className="border-2 rounded outline-0 placeholder:text-gray-200  border-gray-200 px-5 py-2 font-bold"
          type="password"
          placeholder="Enter password"
        />
        <button className="bg-blue-500 cursor-pointer rounded px-5 text-lg py-2 font-bold mt-5">
          Login
        </button>
        <p className="text-center mt-1">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="font-bold underline text-black ml-1"
          >
            Register
          </NavLink>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
