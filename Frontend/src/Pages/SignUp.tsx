import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { FirebaseError } from "firebase/app";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useSelector } from "react-redux";

type SignUpProps = {
  loginPage: (value: boolean) => void;
  signUpPage: (value: boolean) => void;
};

export default function SignUp({ loginPage, signUpPage }: SignUpProps) {
  const schema = z
    .object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email"),
      phoneNo: z.string().min(10, "Phone number too short").max(12, "Phone number too long"),
      password: z.string().min(8, "Password must be at least 8 characters").max(32),
      confirmPassword: z.string().min(8).max(32),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type SchemaType = z.infer<typeof schema>;

  const { register, handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({resolver: zodResolver(schema),});

  const submit = async(data: SchemaType) => {
    // try {
    //   await createUserWithEmailAndPassword(auth, data.email, data.password);
    //   alert("successfully login")
    // } catch (error: unknown) {
    //   if (error instanceof FirebaseError) {
    //     alert(error.message);
    //   } else {
    //     alert("An unexpected error occurred.");
    //   }
    // }
    console.log(data)
  };

  const mode = useSelector((state: RootState) => state.mode.mode);


  return (
    <div
      className={`bg-inherit p-10 rounded shadow-md w-sm flex flex-col gap-4 z-50 relative font-roboto tracking-wide font-light ${
        mode ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">Sign Up</h2>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 ">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className="w-full p-1.5 border rounded mt-1 text-sm"
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
            className="w-full p-1.5 border rounded mt-1"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Phone No</label>
          <input
            type="text"
            className="w-full p-1.5 border rounded mt-1"
            {...register("phoneNo")}
          />
          {errors.phoneNo && (
            <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full p-1.5 border rounded mt-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm ">Confirm Password</label>
          <input
            type="password"
            className="w-full p-1.5 border rounded mt-1"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
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
