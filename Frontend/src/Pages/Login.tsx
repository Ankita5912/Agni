import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { toast } from "react-hot-toast";
import axios from "axios";
import { login } from "../Redux/Actions/authAction";
import { useNavigate } from "react-router-dom";

//Define prop types
interface LoginProps {
  loginPage: (state: boolean) => void;
  signUpPage: (state: boolean) => void;
}

export default function Login({ loginPage, signUpPage }: LoginProps) {

  // Schema validation using Zod
  const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32),
  });
  const navigate = useNavigate();
  type SchemaType = z.infer<typeof schema>;

  // useForm setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  //Form submission handler
  const submit = async (data: SchemaType) => {
    try {
      const result = await axios.post("https://agni-9mw4.onrender.com/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Ensure response contains token
      if (!result.data?.token) {
        toast.error("Login failed. No token received.");
        return;
      }

      dispatch(login(result.data.token));
      
      // Save token (synchronously)
      localStorage.setItem("token", result.data.token);
      toast.success("Login successful");
      navigate("/kanban", { replace: true });
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
        console.error("Axios error:", error.response);
      } else {
        toast.error("An unexpected error occurred on the client side.");
        console.error("Unexpected error:", error);
      }
    }
  };

  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <div
      className={`text-inherit p-6 rounded shadow-md w-80 flex flex-col gap-4 z-50 relative font-roboto tracking-wide font-light ${mode ? "bg-white" : "bg-[#1e1e1e]"
        }`}
    >
      <h2 className="text-2xl font-bold text-center">Login</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm ">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full p-2 border rounded mt-1 focus:ring-1 focus:ring-blue-500 focus:outline-none ${mode ? "border-gray-300" : "border-gray-800"
              }`}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm ">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`w-full p-2 border rounded mt-1 focus:ring-1 focus:ring-blue-500 focus:outline-none ${mode ? "border-gray-300" : "border-gray-800"
              }`}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {/* Switch to Sign Up */}
      <div className="text-sm text-center mt-2">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            loginPage(false);
            signUpPage(true);
          }}
        >
          Sign Up
        </span>
      </div>
    </div>
  );
}
