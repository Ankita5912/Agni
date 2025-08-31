import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../Redux/store';
import { updateProject } from '../Redux/Slice/projectSlice';
import type { RootState } from '../Redux/Reducers/rootReducer';
import { useEffect, useMemo, useState,} from 'react';
import axios from 'axios';
import Select from 'react-select';
import toast from 'react-hot-toast';

interface propType{
  id: string;
}

export default function ProjectUpdateForm({ id }: propType) {
  const [inputValueChanging, setChangingValue] = useState("")
  const [option, setOption] = useState<{ value: string; label: string }[]>();
  const dispatch = useDispatch<AppDispatch>();
  const updateProjectSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long").optional(),
    description: z.string().min(10, "minimum 10 characters long").optional(),
    status: z
      .enum(["To Do" , "In Progress" , "Completed" , "Review" , "On Hold"])
      .optional(),
    teamId: z.string().optional(),
  });

  const project = useSelector((state: RootState) => state.Project.projects);
  //fetching the project with ID from redux state to show their values on input fields
  const projectbyId = useMemo(() => {
    return project.find((proj) => proj._id === id);
  }, [project, id]);
  
  type updateProjectType = z.infer<typeof updateProjectSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<updateProjectType>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      heading: projectbyId?.heading ?? "",
      description: projectbyId?.description ?? "",
      teamId: projectbyId?.team
    },
  });
  //token from local storage
  const token = localStorage.getItem('token');
  //function to fetch teams
  const fetchTeamsByQuery = async () => {
    try {
      const results = await axios.get(
        `https://agni-9mw4.onrender.com/api/teams/search?search=${inputValueChanging}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('fetch team by search', results.data);
      if (!Array.isArray(results.data.team)) {
        console.error("Unexpected response format:", results.data.team);
        return;
      }
      
      const formattedData = results.data.team.map((team: { _id: string; teamId: string }) => ({
        value: team._id,
        label: team.teamId
      }));
      console.log(results.data);
      setOption(formattedData);  
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error('Failed to fetch data');
    }
  }  
  useEffect(() => {
    fetchTeamsByQuery()
  }, [inputValueChanging]);
  const selectedteams = watch("teamId");

  const onSubmit = async(data: updateProjectType) => {
    try {
      if (!id) {
        // Handle the error as appropriate for your app
        alert("Project ID is missing.");
        return;
      }
      console.log(id)
      const resultAction = await dispatch(
        updateProject({ uuid: id, updates: data })
      );
      const payload = resultAction.payload as { message?: string } | string;
      toast.success(
        typeof payload === "string"
          ? payload
          : payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
            ? payload.message
            : "Project updated successfully"
      );

      console.log(id);
    } catch (error) {
      console.error(error);
    }
    console.log(id)
  };



  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <form
      className={`text-inherit p-6 rounded shadow-md md:w-96 w-76 flex flex-col gap-4 z-50 relative font-roboto tracking-wide font-light ${
        mode ? "bg-white" : "bg-[#1e1e1e]"
      }`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`text-xl font-bold text-center`}>Update Project</h2>

      {/* Project Title */}
      <div>
        <label
          className={`block text-sm  mb-1 ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Project Title
        </label>
        <input
          type="text"
          value={projectbyId?.heading}
          {...register("heading")}
          className={`w-full border focus:border-0  px-3 py-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${
            mode ? "border-gray-300" : "border-gray-800"
          }`}
          required
        />
        {errors.heading && (
          <p className="text-red-500 text-sm">{errors.heading.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          className={`block text-sm  mb-1 ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Description
        </label>
        <textarea
          rows={3}
          {...register("description")}
          className={`w-full border focus:border-0  px-3 py-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${
            mode ? "border-gray-300" : "border-gray-800"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label
          className={`block text-sm  mb-1 ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Status
        </label>
        <select
          {...register("status")}
          className={`w-full border focus:border-0  px-3 py-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${
            mode ? "border-gray-300" : "border-gray-800"
          }`}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>On Hold</option>
          <option>Review</option>
          <option>Completed</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      {/* team */}
      <div>
        <label
          className={`block text-sm  mb-1 ${
            mode ? "text-[#444950] font-medium" : "font-light"
          }`}
        >
          Team
        </label>
        <Select
          options={option}
          value={option?.find((opt) => opt.value === selectedteams)}
          onInputChange={(value) => setChangingValue(value)} // typing triggers fetch
          onChange={(selected) =>
            setValue(
              "teamId",
              (selected as { value: string; label: string }).value, // single string
              { shouldValidate: true }
            )
          }
          placeholder="Search teams..."
          className="text-black"
        />
        {errors.teamId && (
          <p className="text-red-500 text-sm">{errors.teamId.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full font-light text-white rounded-lg py-2  bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] transition-all hover:opacity-95 active:scale-95 duration-200`}
        disabled={isSubmitting}
      >
        Update Project
      </button>
    </form>
  );
};

