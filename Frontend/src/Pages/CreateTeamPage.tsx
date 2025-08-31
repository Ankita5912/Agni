import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from 'react-select'
import type { AppDispatch } from "../Redux/store";
import { createTeam } from "../Redux/Slice/teamSlice";
import toast from "react-hot-toast";

export default function CreateTeamForm() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  
  const [searchText, setSearchText] = useState("");
  // fetch users dynamically
  const fetchUsers = async (search: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API response:", res.data); // 👀 check what backend sends

      if (!Array.isArray(res.data)) {
        console.error("Unexpected response format:", res.data);
        return;
      }
      // Transform response into react-select format
      const formatted = res.data.map((user) => ({
        value: user._id,
        label: user.username,
      }));

      setOptions(formatted);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchUsers(searchText);
    }
  }, [searchText]);

  // Zod schema
  const teamFormSchema = z.object({
    name: z.string().min(2, "Minimum two characters required"),
    teamId: z
      .string()
      .min(3, { message: "Team id must be at least 3 characters" })
      .max(20, { message: "Team id must be less than 20 characters" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Team id can only contain letters, numbers, and underscores",
      })
      .transform((val) => val.trim().toLowerCase()),
    members: z.array(z.string()).min(1, "At least one member is required"),
  });

  type SchemaType = z.infer<typeof teamFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SchemaType>({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      members: [], 
    },
  });

   const selectedMembers = watch("members");

  const submit = async (data: SchemaType) => {
    try {
      const resultAction = await dispatch(createTeam(data));
      console.log(resultAction);
      
        const payload = resultAction.payload as { message?: string } | string;
        toast.success(
          typeof payload === "string"
            ? payload
            : payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
            ? payload.message
            : "Team created successfully"
        );
      
    } catch (error) {
      // Optionally handle error here
      console.error(error);
    }
  };

  return (
    <form
      className={`rounded-xl md:p-6 p-2 z-50 shadow-lg w-full text-inherit max-w-md h-fit flex flex-col gap-2 transition-colors ${
        mode ? "bg-white" : "bg-[#1d1e21] border-gray-800"
      }`}
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-xl font-bold font-roboto flex gap-2 mb-4">
        <Users /> Create Team
      </h2>

      {/* Team Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="teamName"
          className={`text-sm ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Team Name<span className="text-red-700">*</span>
        </label>
        <input
          type="text"
          id="teamName"
          {...register("name")}
          className={`border p-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${
            mode ? "border-gray-300" : "border-gray-800"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Team Members (Async Multi Select) */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="members"
          className={`text-sm ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Members<span className="text-red-700">*</span>
        </label>

        <Select
          isMulti
          options={options}
          value={options.filter((opt) => selectedMembers.includes(opt.value))}
          onInputChange={(value) => setSearchText(value)} // typing triggers fetch
          onChange={(selected) =>
            setValue(
              "members",
              (selected as { value: string; label: string }[]).map(
                (s) => s.value
              ),
              { shouldValidate: true }
            )
          }
          placeholder="Search users..."
          className="text-black"
        />
        {errors.members && (
          <p className="text-red-500 text-sm">{errors.members.message}</p>
        )}
      </div>

      {/* Team ID */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="teamSlug"
          className={`text-sm ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Unique Team ID<span className="text-red-700">*</span>
          <span className="text-[#afb3b8] font-thin">(A_Z&1-0)</span>
        </label>
        <input
          type="text"
          id="teamSlug"
          {...register("teamId")}
          className={`border p-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${
            mode ? "border-gray-300" : "border-gray-800"
          }`}
        />
        {errors.teamId && (
          <p className="text-red-500 text-sm">{errors.teamId.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white py-2 rounded-md hover:opacity-90 active:scale-95 transition-all duration-200 mt-2"
        disabled={isSubmitting}
      >
        Create
      </button>
    </form>
  );
}
