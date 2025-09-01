import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { createSubtask, deleteSubtask } from "../Redux/Slice/subtaskSlice";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { AppDispatch } from "../Redux/store";
import { Pen, Trash } from "lucide-react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import SubtaskUpdateForm from "../Pages/SubtaskUpdate";

export default function List() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const { projectId } = useParams();
  const [activeSubtaskId, setActiveSubtaskId] = useState<string>('');
  // Redux subtasks
  const subtasks = useSelector((state: RootState) => state.Subtask.subtasks);

  const [createTask, setTask] = useState(false);
  const [update, setUpdate] = useState(false);
  const handleSubtaskForm = () => {
    setUpdate(!update);
  }
  const subtaskSchema = z.object({
    heading: z.string().min(2, "Minimum 2 characters"),
    startDate: z.coerce.date().optional(),
    deadline: z.coerce.date().optional(),
    status: z.enum(["To Do", "In Progress", "Completed", "Review", "On hold"]),
    assignedTo: z.string().optional(),
  });

  type SchemaType = z.infer<typeof subtaskSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SchemaType>({
    resolver: zodResolver(subtaskSchema),
  });

  const [option, setOption] = useState<{ value: string; label: string }[]>([]);
  const [inputValueChanging, setChangingValue] = useState("");
  const token = localStorage.getItem('token')
  const fetchUsers = async () => {
    try {
      const res = await axios(
        `https://agni-9mw4.onrender.com/api/users?search=${inputValueChanging}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!Array.isArray(res.data)) {
        console.error("Unexpected response format:", res.data);
        return;
      }
      const formatted = res.data.map((user) => ({
        value: user._id,
        label: user.username,
      }));
      setOption(formatted);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [inputValueChanging])

  const onsubmit = async (data: SchemaType) => {
    try {
      if (projectId) {
        const result = await dispatch(
          createSubtask({ projectId, subtask: data })
        );
        setTask(false);
        const payload = result.payload as { message?: string } | string;
        toast.success(
          typeof payload === "string"
            ? payload
            : payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
              ? payload.message
              : "Subtaskcreated successfully"
        );
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="px-5">
      <div
        className={`overflow-x-auto rounded-2xl shadow-md border mb-4 ${mode ? "border-black/20" : "border-black/35"
          }`}
      >
        <table className="min-w-full h-full text-sm text-left">
          <thead
            className={`text-xs uppercase font-semibold tracking-wider text-[#444950] ${mode ? "bg-[#d2d3d5]" : "bg-black/40"
              }`}
          >
            <tr>
              <th className="px-4 py-3">Heading</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subtasks.map((task, index) => (
              <tr
                key={index}
                className={`transition border-b ${mode
                    ? "border-black/20 hover:bg-[#f8f9fa]"
                    : "border-black/35 hover:bg-[#2c2d31]"
                  }`}
              >
                <td className="px-4 py-3">{task.heading}</td>
                <td className="px-4 py-3">{task.assignedTo}</td>
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400">
                  {task.status}
                </td>
                <td className="px-4 py-3">
                  {task.startDate?.toString().substring(0, 10)}
                </td>
                <td className="px-4 py-3">
                  {task.deadline?.toString().substring(0, 10)}
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-3">
                  <button
                    className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900 transition"
                    onClick={() => {
                      dispatch(deleteSubtask(task._id)).then((result) => {
                        const payload = (result as { payload?: { message?: string } }).payload;
                        toast.success(payload?.message || "Subtask deleted successfully!");
                      });
                    }}
                  >
                    <Trash size={16} className="text-red-500" />
                  </button>
                  <button
                    className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                    onClick={() => { setUpdate(true);  setActiveSubtaskId(task._id)}}
                  >
                    <Pen size={16} className="text-blue-500" />
                  </button>
                </td>
              </tr>
            ))}

            {createTask && (
              <tr>
                <td colSpan={6} className="p-0">
                  <form
                    onSubmit={handleSubmit(onsubmit)}
                    className="flex flex-wrap items-center gap-3 px-4 py-3"
                  >
                    <input
                      type="text"
                      {...register("heading")}
                      className={`flex-1 min-w-[150px] px-2 py-2  rounded-md outline-0 ${mode ? "" : "placeholder:text-white/75"
                        }`}
                      placeholder="Heading"
                    />
                    {errors.heading && <span>{errors.heading.message}</span>}
                    <Select
                      options={option}
                      onInputChange={(value) => setChangingValue(value)}
                      onChange={(selected) =>
                        setValue(
                          "assignedTo",
                          (selected as { value: string; label: string }).value,
                          { shouldValidate: true }
                        )
                      }
                      placeholder="Assign..."
                      className="flex-1 min-w-[150px] text-black"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // ensure above everything
                      }}
                    />
                    <select
                      {...register("status")}
                      className="flex-1 min-w-[120px] px-2 py-1 rounded-md  outline-0"
                    >
                      <option value="To Do">To Do</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Review">Review</option>
                      <option value="On hold">On hold</option>
                    </select>
                    <input
                      type="date"
                      {...register("startDate")}
                      className="flex-1 min-w-[140px] px-2 py-1 rounded-md outline-0.1 focus:outline-blue-300"
                    />
                    {errors.startDate && (
                      <span>{errors.startDate.message}</span>
                    )}
                    <input
                      type="date"
                      {...register("deadline")}
                      className="flex-1 min-w-[140px] px-2 py-1 rounded-md outline-0.5  focus:outline-blue-300"
                    />
                    {errors.deadline && <span>{errors.deadline.message}</span>}
                    <button
                      type="submit"
                      className="py-1 px-4 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
                      onClick={handleSubmit(onsubmit)}
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </form>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {update && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0  ${mode ? "bg-blue-950/30" : "bg-black/60"
              }`}
            onClick={handleSubtaskForm} // close when clicking backdrop
          />
          <SubtaskUpdateForm id={activeSubtaskId} />
        </div>
      )}
      {/* Bottom Action Buttons */}
      <div className="flex gap-2">
        {!createTask && (
          <div onClick={() => setTask(true)}>
            <Button buttonName="+ Create" />
          </div>
        )}
      </div>
    </div>
  );
}
