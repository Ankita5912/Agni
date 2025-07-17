import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { CalendarDays, Users, Flag, Pen, Trash } from "lucide-react";

export type cardProptype = {
  heading: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: Date;
  deadline: Date;
  team?: string;
};

const statusStyles: Record<cardProptype["status"], string> = {
  "To Do": "from-gray-400 to-gray-600",
  "In Progress": "from-yellow-400 to-yellow-600",
  Completed: "from-green-400 to-green-600",
  "On Hold": "from-red-400 to-red-600",
  Review: "from-blue-400 to-blue-600",
};

export default function ProjectCard({
  heading,
  description,
  status,
  startDate,
  deadline,
  team,
}: cardProptype) {
  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <div
      className={`relative group w-full max-w-xs p-5 rounded-sm shadow-md backdrop-blur-md overflow-hidden border transition-all group hover:shadow-2xl ${
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
          className={`text-sm font-Manrope ${
            mode ? "text-[#444950]" : "text-gray-300"
          }`}
        >
          {description}
        </p>

        <div className="space-y-2 pt-2 text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <CalendarDays size={16} />
            Start: <span>{startDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Flag size={16} />
            Deadline: <span>{deadline.toLocaleDateString()}</span>
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
          <button>
            <Trash size={14} />
          </button>
          <button>
            <Pen size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

