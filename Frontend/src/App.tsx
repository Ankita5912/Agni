import { BrowserRouter, Routes, Route } from "react-router-dom";
import {  useSelector } from "react-redux";
import type { RootState } from "./Redux/Reducers/rootReducer";
import Subtask from "./Components/SubtaskDashboard";
import HomePage from "./Pages/Home";
import CreateProject from "./Pages/CreateProjectPage";
import KanbanBoard from "./Pages/KanbanBoard";
import ProjectDashboard from "./Pages/Dashboard";
import ProjectPage from "./Pages/ProjectPage";
import Board from "./Components/Board";
import List from "./Components/List";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
import CreateTeamForm from "./Pages/CreateTeamPage";
import LoginPage from "./Pages/LoginPage";


function App() {
  const mode = useSelector((state: RootState) => state.mode.mode);
  
 
  return (
    <BrowserRouter>
      <div
        className={`min-h-screen ${
          mode ? "bg-white text-black/85" : "bg-[#1F1F21] text-white/90"
        }`}
      >
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route
            path="/create-project"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/team"
            element={
              <ProtectedRoute>
                <CreateTeamForm/>
              </ProtectedRoute>
            }
          />

          {/* Parent Route for KanbanBoard */}
          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <KanbanBoard />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes - use RELATIVE paths */}
            <Route index element={<ProjectDashboard />} /> {/* default view */}
            <Route path="dashboard" element={<ProjectDashboard />} />
            <Route path="project/:projectId" element={<ProjectPage />}>
              <Route index element={<Navigate to="summary" replace />} />
              <Route path="summary" element={<Subtask />} />
              <Route path="board" element={<Board />} />
              <Route path="list" element={<List />} />
            </Route>
          </Route>

        </Routes>
      </div>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
