import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

export default function HomePage() {
  const navigate = useNavigate();
  const mode = useSelector((state: RootState) => state.mode.mode);
  return (
    <div className="relative overflow-hidden">
      <Navbar2 />
      <main className="flex flex-col w-full items-center justify-center">
        <div className="max-w-4xl w-full text-center mt-32">
          <h1
            className={`text-6xl/tight font-extrabold font-josphin mb-6 ${
              mode ? "text-black" : "text-white"
            }`}
          >
            <span className="font-normal tracking-tighter z-20">
              Welcome to your Kanban Board
            </span>{" "}
            Flow with{" "}
            <span className="font-extrabold font-poppins text-[#0052CC]">
              Agni
            </span>
          </h1>
          <div className="absolute -mt-40 ml-115 z-1">
            <img src="/just.png" className="h-50" />
          </div>
          <div className="absolute -mt-30 ml-118 h-fit w-fit rotate-26">
            <img src="/arrow.png" className="h-62"></img>
          </div>
          <div onClick={() => navigate("/create-project")}>
            <button
              className={` font-semibold tracking-wide  font-Manrope bg-blend-color-burn h-12  max-w-fit py-1 px-5 cursor-pointer rounded-full  ${
                mode
                  ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white"
                  : "bg-[#f8f9fa] text-black/90  "
              }`}
            >
              Create New Project
            </button>
          </div>
          <h1 className="text-md font-bold font-Manrope text-[#444950] mt-6">
            Manage Your Projects the Agile Way — Seamlessly
          </h1>
          {/* <p className="text-lg md:text-xl leading-relaxed text-gray-600">
            Welcome to <strong className="text-indigo-600">AgniFlow</strong>,
            your modern Kanban-based workspace designed for individuals and
            agile teams. Create boards, organize tasks with lists and cards, and
            visualize your workflow with seamless drag-and-drop functionality.
            Whether you're managing a personal sprint or collaborating across a
            team, AgniFlow supports assigning tasks, setting deadlines, adding
            descriptions, and attaching files — all while following the Agile
            Scrum methodology. Build projects, form teams, and track progress
            across devices with an intuitive and responsive interface.
          </p> */}
        </div>
      </main>
    </div>
  );
}
