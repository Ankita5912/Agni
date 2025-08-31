import { User } from "../Models/user.model.js";
import { email, z } from "zod";

//register controller
export const register = async (req, res) => {
  //request data from body
  //validating data
  //finding whether the user exists or not
  //if user exists return user already exists
  //if not exists create user in database
  //return user created with name and email
  const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    username: z
      .string()
      .min(3, "user name must be at least 3 characters")
      .max(20, "Username must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
  });
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors:
        result.error?.errors?.map((err) => ({
          field: err.path[0],
          message: err.message,
        })) || "Invalid input",
    });
  }
  try {
    //destructing objects from the result that store data from req.body
    const { name, email, password, username } = result.data;

    //finding user in the database
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      return res.status(400).json({
        message: "User already exists with this email or username",
      });
    }
  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
  name
  )}&chars=2&backgroundColor=1868db`;
    const user = await User.create({ name, email, password, username, avatarUrl });
    return res.status(201).json({
      message: "User created successfully",
      user: {
        name,
        email,
        username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//login controller
export const login = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  try {
    //destructing objects from the result that store data from req.body
    const { email, password } = result.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    // Check if the password matches
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status().json({
        message: "Enter a valid password",
      });
    }

    return res
      .status(200)
      .cookie("token", user.generateJWT(), {
        httpOnly: true, // secure storage, no JS access
        secure: true, // only over HTTPS
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        token : user.generateJWT()
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
