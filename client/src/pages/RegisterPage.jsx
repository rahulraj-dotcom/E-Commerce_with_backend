import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import api from "../apis/apis";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate()

  const registerSubmitHandler = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log(response.data);

      navigate("/login")

      reset();

    } catch (error) {
      console.log("error in register API", error);
    }
  };

  return (
    <main className="bg-black/50 h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(registerSubmitHandler)}
        className="p-10 bg-orange-600 flex flex-col gap-3 w-145 text-white rounded-xl"
      >
        <h1 className="text-3xl font-bold mb-5">Register here...</h1>
        <input
          {...register("name")}
          className="border-2 rounded outline-0 placeholder:text-gray-200  border-gray-200 px-5 py-2 font-bold"
          type="text"
          placeholder="Enter your name"
        />
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
        <input
          {...register("confirmPassword")}
          className="border-2 rounded outline-0 placeholder:text-gray-200  border-gray-200 px-5 py-2 font-bold"
          type="password"
          placeholder="Confirm password"
        />

        <button className="bg-blue-500 cursor-pointer rounded px-5 text-lg py-2 font-bold mt-5">
          Register
        </button>
        <p className="text-center mt-1">
          Already have an account?{" "}
          <NavLink to="/login" className="font-bold underline text-black ml-1">
            Login
          </NavLink>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
