import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { trim } from "zod";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 6 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index : true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be less than 20 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    skills: [
      {
        type: String,
        enum: [
          "JavaScript",
          "Python",
          "Java",
          "C++",
          "C#",
          "Ruby",
          "PHP",
          "Go",
          "Swift",
          "Kotlin",
          "TypeScript",
          "Rust",
        ],
      },
    ],
    avatarUrl: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
  }
);



userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateJWT = function () {
  return JWT.sign(
    { _id: this._id, email: this.email, teams: this.teams, username :this.username },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "3d" }
  );
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
