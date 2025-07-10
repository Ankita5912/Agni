import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/Navbar2";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Navbar2 />
      <main className="min-h-fit px-6 py-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full text-center space-y-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
            Welcome to your Kanban Board
          </h1>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Manage Your Projects the Agile Way — Seamlessly
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600">
            Welcome to <strong className="text-indigo-600">AgniFlow</strong>,
            your modern Kanban-based workspace designed for individuals and
            agile teams. Create boards, organize tasks with lists and cards, and
            visualize your workflow with seamless drag-and-drop functionality.
            Whether you're managing a personal sprint or collaborating across a
            team, AgniFlow supports assigning tasks, setting deadlines, adding
            descriptions, and attaching files — all while following the Agile
            Scrum methodology. Build projects, form teams, and track progress
            across devices with an intuitive and responsive interface.
          </p>
          <button
            onClick={() => navigate("/create-project")}
            className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-lg rounded-xl shadow transition-all"
          >
            Create New Project
          </button>

        </div>
      </main>
    </div>
  );
}
