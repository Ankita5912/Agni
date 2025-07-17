import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Loader from "../Components/Loader";

export default function KanbanBoard() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [spinner, setspinner] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setspinner(false), 2000);
  }, []);

  if (spinner) {
    return <Loader />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      {/* Fixed Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarVisible((prev) => !prev)} />

      {/* Grid layout starts below fixed navbar */}
      <div className="grid relative grid-cols-1 md:grid-cols-[16rem_1fr] flex-1 mt-14 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarVisible ? "block" : "hidden"
          } fixed top-14 left-0 z-40 w-2/3 h-[calc(100vh-4rem)]
             
            md:block md:static md:h-full md:w-full
          `}
        >
          <Sidebar value={true} />
        </div>

        {/* Main content area — scrollable only */}
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
