import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Select from 'react-select';
import { updateSubtask } from "../Redux/Slice/subtaskSlice";
import type { AppDispatch } from "../Redux/store";
import { ClipboardPenLine } from "lucide-react";
interface subtaskUpdateProptype {
  id: string
}
export default function SubtaskUpdateForm({ id }: subtaskUpdateProptype) {

  const mode = useSelector((state: RootState) => state.mode.mode);

  const subtask = useSelector((state: RootState) => state.Subtask.subtasks);
  //fetching the project with ID from redux state to show their values on input fields
  const subtaskId = useMemo(() => {
    return subtask.find((proj) => proj._id === id);
  }, [subtask, id]);
  const dispatch = useDispatch<AppDispatch>();
  const subtaskSchema = z.object({
    heading: z.string().min(2, "minimum 2 characters long").optional(),
    status: z.enum(["To Do", "In Progress", "Completed", "Review", "On hold"]).optional(),
    assignedTo: z.string().optional(),
  });

  type SchemaType = z.infer<typeof subtaskSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<SchemaType>({
    resolver: zodResolver(subtaskSchema),
    defaultValues: {
      heading: subtaskId?.heading?? "",
      status: subtaskId?.status?? "",
      assignedTo: subtaskId?.assignedTo ?? '',
    },
  });

  const [option, setOption] = useState<{ value: string; label: string }[]>([]);
  const [inputValueChanging, setChangingValue] = useState("");
  const token = localStorage.getItem('token');
  const fetchUsers = async () => {
    try {
      const res = await axios(
        `http://localhost:5000/api/users?search=${inputValueChanging}`,
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
  }, [inputValueChanging]);

  const onsubmit = async (data: SchemaType) => {
    try {
      if (id) {
        const result = await dispatch(
          updateSubtask({ uuid: id, updates: data })
        );
        const payload = result.payload as { message?: string } | string;
        toast.success(
          typeof payload === "string"
            ? payload
            : payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
              ? payload.message
              : "Subtask updated successfully"
        );
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className={`rounded-xl relative md:p-6 p-2 z-50 shadow-lg w-full text-inherit max-w-md h-fit flex flex-col gap-2 transition-colors ${mode ? "bg-white" : "bg-[#1d1e21] border-gray-800"
      }`}
      onSubmit={handleSubmit(onsubmit)}>
      <h2 className="text-xl font-bold font-roboto flex gap-2 mb-4 items-center">
        <ClipboardPenLine size={20} color="orange"/>
        Update Task
        
      </h2>

      {/* Title */}
      <div>
        <label className={`block text-sm  mb-1 ${mode ? "text-[#444950] font-medium" : "font-light"
          }`}>Heading</label>
        <input
          type="text"
          {...register('heading')}
          className={`w-full border p-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${mode ? "border-gray-300" : "border-gray-800"
            }`}
          required
        />
        {errors.heading && <span className="text-xs text-red-800">{errors.heading.message}</span>}
      </div>

      {/* Status */}
      <div>
        <label className={`block text-sm  mb-1 ${mode ? "text-[#444950] font-medium" : "font-light"
          }`}>Status</label>
        <select
          {...register('status')}
          className={`w-full border p-2 rounded-md focus:ring-2 focus:ring-[var(--primary-color)] focus:outline-none ${mode ? "border-gray-300" : "border-gray-800"
            }`}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>
        {errors.status && <span className="text-xs text-red-800">{errors.status.message}</span>}
      </div>

      {/* Assignee */}
      <div>
        <label className={`block text-sm  mb-1 ${mode ? "text-[#444950] font-medium" : "font-light"
          }`}>Assignee</label>
        <Select
          options={option}
          onInputChange={(value: string) => setChangingValue(value)}
          onChange={(selected: { value: string; label: string } | null) =>
            setValue(
              "assignedTo",
              (selected as { value: string; label: string })?.value,
              { shouldValidate: true }
            )
          }
          placeholder="Assign..."
          className="flex-1 min-w-[150px] text-black"
        />
        {errors.assignedTo && <span className="text-xs text-red-800">{errors.assignedTo.message}</span>}
      </div>

      <div className="flex gap-4 mt-4">
        <button type="reset"
        className="w-20 bg-blue-600  text-white rounded-lg py-1.5  hover:bg-blue-700 transition"
      >
        reset
      </button>
        {/* Submit */}
        <button
          type="submit"
          className="w-20 bg-blue-600 text-white rounded-lg py-1.5 hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          Update
        </button></div>
    </form>
  );
};

