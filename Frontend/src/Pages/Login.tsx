import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { login } from "../Redux/Actions/authAction";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

//Define prop types
interface LoginProps {
  loginPage: (state: boolean) => void;
  signUpPage: (state: boolean) => void;
}

export default function Login({ loginPage, signUpPage }: LoginProps) {
  // Schema validation using Zod
  const schema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters").max(32),
  });

  type SchemaType = z.infer<typeof schema>;

  // useForm setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  //Form submission handler
  const submit = async(data: SchemaType) => {
    // try {
    //   await signInWithEmailAndPassword(auth, data.email, data.password);
    //   alert("logges in succesfully"); // clear error if success
    // } catch (error) {
    //    if (error instanceof FirebaseError) {
    //           alert(error.message);
    //         } else {
    //           alert("An unexpected error occurred.");
    //         }
    // }
    console.log(data)
  };

  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <div
      className={`text-inherit p-6 rounded shadow-md w-80 flex flex-col gap-4 z-50 relative font-roboto tracking-wide font-light ${
        mode ? "bg-white" : "bg-[#1e1e1e]"
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
            className="w-full p-2 border rounded mt-1"
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
            className="w-full p-2 border rounded mt-1"
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
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
