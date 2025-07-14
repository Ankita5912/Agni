import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useNavigate } from "react-router-dom";
import { createProject } from "../Redux/Actions/projectAction";
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch } from "../Redux/store";

const schema = z.object({
  Heading: z.string().min(4, "Heading must be at least 4 characters"),
  Description: z.string().max(100, "Description must be under 100 characters"),
  status: z.enum(["To Do", "In Progress", "Review", "Completed"], {
    required_error: "Please select a status",
  }),
  startDate: z.string().nonempty("Start date is required"),
  deadline: z.string().nonempty("Deadline is required"),
});

type FormType = z.infer<typeof schema>;

export default function CreProjectForm() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate()

  const onSubmit = (data: FormType) => {

    const newProject = {
      uuid: uuidv4(),
      heading: data.Heading,
      description: data.Description,
      status: data.status,
      startDate: new Date(data.startDate),
      deadline: new Date(data.deadline),
      team: "Default Team",
      subtask: [],
    };
    dispatch(createProject(newProject));
    navigate("/kanban");
  };

  return (
    <section
      className={`rounded-xl p-6 shadow-lg w-full text-inherit max-w-md transition-colors ${
        mode ? "bg-white" : "bg-[#1e1e1e]"
      }`}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Heading */}
        <div>
          <label htmlFor="Heading" className="block text-sm mb-1">
            Project Heading
          </label>
          <input
            id="Heading"
            type="text"
            {...register("Heading")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter project heading"
          />
          {errors.Heading && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Heading.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="Description" className="block text-sm mb-1">
            Description
          </label>
          <textarea
            id="Description"
            rows={5}
            cols={5}
            {...register("Description")}
            className="w-full px-3 py-2 h-20 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Project description (max 100 chars)"
          ></textarea>
          {errors.Description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Description.message}
            </p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm mb-1">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            {...register("startDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-sm mb-1">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            {...register("deadline")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.deadline && (
            <p className="text-red-500 text-xs mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm mb-1">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
        >
          Create Project
        </button>
      </form>
    </section>
  );
}
