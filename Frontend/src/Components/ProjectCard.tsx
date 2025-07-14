import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

export type cardProptype = {
  heading: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: Date;
  deadline: Date;
  team?: string;
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
      className={`relative w-full md:min-w-2xs max-w-2xs p-4 rounded shadow-md border overflow-hidden hover:shadow-2xl  ${
        mode ? "bg-white border-black/10" : "bg-[#242528] border-black/30"
      }`}
    >
      {/* SVG Decorative Blob */}
      <div className="absolute -top-12 -left-15 w-40 h-40 z-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={mode ? "#1e3a8a" : "#ffffff"}
            d="M28.6,-13C32,1.2,26.3,14.7,12.7,26.8C-0.9,38.9,-22.3,49.5,-33.1,42.5C-43.8,35.4,-43.9,10.5,-36.6,-9C-29.3,-28.5,-14.7,-42.7,-1,-42.3C12.6,-42,25.2,-27.1,28.6,-13Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="font-semibold font-poppins text-sm mb-1">{heading}</h1>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="mt-2 text-xs">
          Status: <span className="font-semibold">{status}</span>
        </p>
        <p className="text-xs">Start Date: {startDate.toLocaleDateString()}</p>
        <p className="text-xs">Deadline: {deadline.toLocaleDateString()}</p>
        <p className="text-xs">Team: {team}</p>
      </div>
    </div>
  );
}
