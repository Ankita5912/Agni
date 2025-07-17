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
      <main className="flex flex-col w-full items-center justify-center px-3">
        <div className="max-w-4xl w-full text-center mt-32">
          <h1
            className={`sm:text-6xl/tight text-3xl sm:font-extrabold font-bold font-josphin mb-6 ${
              mode ? "text-black" : "text-white"
            }`}
          >
            <span className="font-normal tracking-tighter z-20">
              Welcome to your Kanban Board
            </span>{" "}
            Flow with{" "}
            <span className="font-extrabold font-poppins text-[var(--primary-color)]">
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
              className={`sm:text-base text-xs sm:font-semibold font-normal tracking-wide  font-Manrope bg-blend-color-burn sm:h-12 h-10  max-w-fit py-1 sm:px-5 px-4 cursor-pointer rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white`}
            >
              Create New Project
            </button>
          </div>
          <h1
            className={`sm:text-base text-sm sm:font-bold font-semibold font-Manrope  mt-6 ${
              mode ? "text-[#444950]" : "text-inherit"
            }`}
          >
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
