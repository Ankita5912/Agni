import ProjectCard from "../Components/ProjectCard";
import StatusPieChart from "../Components/PieChart";
import LineChart2 from "../Components/LineChart";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { useMemo, useState } from "react";
import ProjectUpdateForm from "./ProjectUpdate";


export default function ProjectDashboard() {

  const Project = useSelector((state: RootState) => state.Project.projects);
  const mode = useSelector((state: RootState) => state.mode.mode);
  const [showUpdateForm, setshowForm] = useState<boolean>(false);
  const [activeProjectID, setActiveProjctId] = useState<string>("");
  const ProStartEnd = useMemo(() => {
    return Project.map(({ heading, startDate, deadline }) => ({
      heading,
      startDate: new Date(startDate),
      deadline: new Date(deadline),
    }));
  }, [Project]);

  const StatusCounts = () => {
    const statusCounts = {
      todo: 0,
      inProgress: 0,
      review: 0,
      completed: 0,
      onhold : 0
    };

    for (const project of Project) {
      switch (project.status) {
        case "To Do":
          statusCounts.todo++;
          break;
        case "In Progress":
          statusCounts.inProgress++;
          break;
        case "Review":
          statusCounts.review++;
          break;
        case "Completed":
          statusCounts.completed++;
          break;
        case "On Hold":
          statusCounts.onhold++
          break;
      }
    }

    return [
      { name: "To Do", value: statusCounts.todo },
      { name: "In Progress", value: statusCounts.inProgress },
      { name: "Review", value: statusCounts.review },
      { name: "Completed", value: statusCounts.completed },
      { name: "On Hold", value: statusCounts.onhold}
    ];
  };
  
  const projectStatusData = StatusCounts();

  const handleForm = () => {
    setshowForm(!showUpdateForm)
  }

  return (
    <div className="w-full pt-4 overflow-y-auto scroll-smooth">
      <h1
        className={`font-roboto mb-4 text-xl border-b  pb-3 px-3 ${
          mode ? "border-black/20" : "border-white/25"
        }`}
      >
        All Projects
      </h1>

      <div
        className="flex overflow-x-auto w-full gap-5 mb-6 py-3 scrollbar-hide  px-3"
        style={{ scrollbarWidth: "none" }}
      >
        {Project.length > 0 ? (
          Project.map((item) => (
            <ProjectCard
              key={item._id}
              _id={item._id}
              heading={item.heading}
              description={item.description}
              status={item.status}
              startDate={item.startDate}
              deadline={item.deadline}
              team={item.team}
              onUpdateForm={handleForm}
              onSetActiveProject={setActiveProjctId}
            />
          ))
        ) : (
          <div className="text-2xl font-bold w-full">
            No project exists. Create some to continue.
          </div>
        )}
      </div>

      {showUpdateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 ${mode ? "bg-blue-950/30" : "bg-black/60"}`}
            onClick={handleForm} // close when clicking backdrop
          />

          <ProjectUpdateForm id={activeProjectID} />
        </div>
      )}

      <h1 className="font-roboto mb-1 text-xl px-3">Analysis</h1>

      {Project.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-5 w-full items-start overflow-x-auto">
          <div
            className={`w-full lg:w-1/3 min-w-[280px] p-2 pb-5 rounded-sm shadow-xl m-2 sm:ml-3 border ${
              mode ? "bg-[#f8f9fa] border-gray-200" : "bg-[#242528] border-none"
            }`}
          >
            <h4 className="px-2 mb-2 text-inherit font-semibold tracking-widest font-roboto" >
              Status overview
            </h4>
            <p className="px-2">Overview of number of task according to status</p>
            <StatusPieChart data={projectStatusData} />
          </div>

          <div
            className={`w-full lg:w-2/3 min-w-[320px] border m-4 mt-2 p-2 py-4 shadow-xl rounded-sm ${
              mode ? "bg-[#f8f9fa] border-gray-200" : "bg-[#242528] border-none"
            }`}
          >
            <h4 className="px-2 mb-2 text-inherit font-semibold tracking-widest font-roboto" >
              Projects overview
            </h4>
            <p className="px-2">Overview of number of days to start the project its deadline and time to complete it</p>
            <LineChart2 data={ProStartEnd} />
          </div>
        </div>
      )}
    </div>
  );
}
