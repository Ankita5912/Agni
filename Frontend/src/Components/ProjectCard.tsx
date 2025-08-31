import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

import type { AppDispatch } from "../Redux/store";
import { CalendarDays, Users, Flag, Pen, Trash } from "lucide-react";
import { deleteProject } from "../Redux/Slice/projectSlice";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export type cardProptype = {
  _id: string;
  heading: string;
  description: string | undefined;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: string | Date;
  deadline: string | Date;
  team?: string;
  onUpdateForm?: () => void;
  onSetActiveProject?: (id: string) => void;
};

const statusStyles: Record<cardProptype["status"], string> = {
  "To Do": "bg-[#146331ff]",
  "In Progress": "bg-[#3e82d4ff]",
  Completed: "bg-[#c90f0fff]",
  "On Hold": "bg-[#a78bfa]",
  "Review": "bg-[#daa215ff]",
};

export default function ProjectCard({
  _id,
  heading,
  description,
  status,
  startDate,
  deadline,
  team,
  onUpdateForm,
  onSetActiveProject,
}: cardProptype) {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();
  const project = useSelector((state: RootState) => state.Project.projects).find((proj) => proj._id === _id);
  useEffect(() => {
    
  },[project])
  // const navigate = useNavigate();

  return (
    <div
      className={`relative group  sm:min-w-2xs sm:max-w-full min-w-3xs  p-5 rounded-sm shadow-md backdrop-blur-md overflow-hidden border transition-all group hover:shadow-2xl ${
        mode ? "bg-white/70 border-gray-200" : "bg-[#1a1b1e]/60 border-gray-800"
      }`}
    >
      {/* Status Badge */}
      <div
        className={`absolute top-4 right-4 text-xs px-3 py-1 font-semibold rounded-full text-white bg-gradient-to-r ${statusStyles[status]}`}
      >
        {status}
      </div>

      <div className="absolute -bottom-10 -right-10 w-32 h-32  rounded-full opacity-20 blur-2xl" />

      {/* Main Content */}
      <div className="relative z-10 space-y-2">
        <h2
          className={`max-w-64 text-xl font-bold  ${
            mode ? "text-gray-900" : "text-white"
          }`}
        >
          {heading}
        </h2>
        <p
          className={`text-sm font-Manrope overflow-x-auto ${
            mode ? "text-[#444950]" : "text-gray-300"
          }`}
        >
          {description}
        </p>

        <div className="space-y-2 pt-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <CalendarDays size={16} />
            Start: <span>{new Date(startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Flag size={16} />
            Deadline: <span>{new Date(deadline).toLocaleDateString()}</span>
          </div>
          {team && (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Users size={16} />
              Team:{" "}
              <span className="font-medium text-gray-800 dark:text-white">
                {team}
              </span>
            </div>
          )}
        </div>
        <div className="absolute right-0 bottom-0 hidden  group-hover:flex flex-row gap-3">
          <button className="cursor-pointer">
            <Trash
              size={14}
              onClick={() => {
                const result = confirm("This action can't be undone");
                if (result) {
                  dispatch(deleteProject(_id));
                }
              }}
            />
          </button>
          <button className="cursor-pointer">
            <Pen
              size={14}
              onClick={() => {
                onSetActiveProject?.(_id); // ✅ call the function safely
                onUpdateForm?.(); // ✅ actually call it
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
