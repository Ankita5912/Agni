import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
// import toast from "react-hot-toast";
type SignUpProps = {
  loginPage: (value: boolean) => void;
  signUpPage: (value: boolean) => void;
};

export default function SignUp({ loginPage, signUpPage }: SignUpProps) {
  const schema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email"),
      username: z
            .string()
            .min(3, "user name must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
              /^[a-zA-Z0-9_]+$/,
              "Username can only contain letters, numbers, and underscores"
            ),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32),
      confirmPassword: z.string().min(8).max(32),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type SchemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({ resolver: zodResolver(schema) });

  const submit = async (data: SchemaType) => {
    try {
      const result = await axios.post(`http://localhost:5000/api/auth/register`, data);
      if (!result) {
        toast.error('validation failed')
      }
      toast.success('register successfull')
    } catch (error) {
      toast.error((error as Error)?.message || "An error occurred")
    }
  };

  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <div
      className={`p-10 rounded shadow-md w-sm flex flex-col gap-4 z-50 relative font-roboto tracking-wide font-light ${
        mode ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 ">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className={`w-full p-1.5 border rounded mt-1 placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
              mode ? "border-gray-300" : "border-gray-800"
            }`}
            placeholder="Full Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm ">Email</label>
          <input
            type="email"
            className={`w-full p-1.5 border rounded mt-1 placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
              mode ? "border-gray-300" : "border-gray-800"
            }`}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Username</label>
          <input
            type="text"
            className={`w-full p-1.5 border rounded mt-1 placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
              mode ? "border-gray-300" : "border-gray-800"
            }`}
            {...register("username")}
            placeholder="username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className={`w-full p-1.5 border rounded mt-1 placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
              mode ? "border-gray-300" : "border-gray-800"
            }`}
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm ">Confirm Password</label>
          <input
            type="password"
            className={`w-full p-1.5 border rounded mt-1 placeholder:text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none ${
              mode ? "border-gray-300" : "border-gray-800"
            }`}
            {...register("confirmPassword")}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

      <div className="text-sm text-center mt-2">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            loginPage(true);
            signUpPage(false);
          }}
        >
          Login
        </span>
      </div>
    </div>
  );
}
