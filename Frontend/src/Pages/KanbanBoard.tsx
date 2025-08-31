import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import CreateTeamForm from "./CreateTeamPage";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

export default function KanbanBoard() {
  const mode = useSelector((state: RootState) => state.mode.mode)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [openTeamForm, setTeamForm] = useState<boolean>();
  const handleCreateTeamForm = () => {
    setTeamForm(!openTeamForm);
  }
  
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      {/* Fixed Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />

      {/* Grid layout starts below fixed navbar */}
      <div
        className={`grid relative  flex-1 mt-14 overflow-hidden ${isSidebarVisible ? "grid-cols-1 md:grid-cols-[16rem_1fr]" : ""
          }`}
      >
        {/* Sidebar */}
        <div
          className={`${isSidebarVisible ? "block md:block md:static" : "hidden"
            } fixed top-14 left-0 z-40 w-2/3 h-[calc(100vh-4rem)]
             
             md:h-full md:w-full
          `}
        >
          <Sidebar value={isSidebarVisible} teamFormstatus={handleCreateTeamForm} />
        </div>

        {
          openTeamForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* Backdrop */}
              <div
                className={`absolute inset-0  ${mode ? "bg-blue-950/30" : "bg-black/60"
                  }`}
                onClick={handleCreateTeamForm} // close when clicking backdrop
              />
              <CreateTeamForm />
            </div>
          )
        }

        {/* Main content area — scrollable only */}
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
