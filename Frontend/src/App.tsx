import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/Reducers/rootReducer";

import HomePage from "./Pages/Home";
import CreateProject from "./Pages/CreateProjectPage";
import KanbanBoard from "./Pages/KanbanBoard";
import ProjectDashboard from "./Pages/Dashboard";

function App() {
  const mode = useSelector((state: RootState) => state.mode.mode);

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen ${
          mode ? "bg-white text-black/85" : "bg-black text-white/90"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-project" element={<CreateProject />} />

          {/* Parent Route for KanbanBoard */}
          <Route path="/kanban" element={<KanbanBoard />}>
            {/* Nested Routes (RELATIVE paths) */}
            <Route index element={<ProjectDashboard />} /> {/* default view */}
            <Route path="dashboard" element={<ProjectDashboard />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
