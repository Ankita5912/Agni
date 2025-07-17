import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/Reducers/rootReducer";
import Subtask from "./Components/Subtask";
import HomePage from "./Pages/Home";
import CreateProject from "./Pages/CreateProjectPage";
import KanbanBoard from "./Pages/KanbanBoard";
import ProjectDashboard from "./Pages/Dashboard";
import ProjectPage from "./Pages/ProjectPage";
import Board from "./Components/Board";
import List from "./Components/List";
import { Navigate } from "react-router-dom";
import { FirebaseListener } from "../FirebaseListener";
import { Toaster } from "react-hot-toast";
function App() {
  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <BrowserRouter>
      <FirebaseListener>
        <div
          className={`min-h-screen ${
            mode ? "bg-white text-black/85" : "bg-[#1F1F21] text-white/90"
          }`}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-project" element={<CreateProject />} />

            {/* Parent Route for KanbanBoard */}
            <Route path="/kanban" element={<KanbanBoard />}>
              {/* Nested Routes (RELATIVE paths) */}
              <Route index element={<ProjectDashboard />} />{" "}
              {/* default view */}
              <Route path="dashboard" element={<ProjectDashboard />} />
              <Route
                path="/kanban/project/:projectId"
                element={<ProjectPage />}
              >
                <Route
                  index
                  element={<Navigate to="summary" replace />}
                ></Route>
                <Route path="summary" element={<Subtask />}></Route>
                <Route path="board" element={<Board />}></Route>
                <Route path="list" element={<List />}></Route>
              </Route>
            </Route>
          </Routes>
        </div>
        <Toaster position="top-right" />
      </FirebaseListener>
    </BrowserRouter>
  );
}

export default App;
