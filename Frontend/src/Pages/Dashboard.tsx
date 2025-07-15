import ProjectCard from "../Components/ProjectCard";
import StatusPieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";

export default function ProjectDashboard() {
  const Project = useSelector((state: RootState) => state.Project.projects);
  const mode = useSelector((state:RootState)=> state.mode.mode)
  const ProStartEnd = () => {
    return Project.map(({ heading, startDate, deadline }) => ({
      heading,
      startDate,
      deadline,
    }));
  };

  const StatusCounts = () => {
    const statusCounts = {
      todo: 0,
      inProgress: 0,
      review: 0,
      completed: 0,
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
      }
    }

    return [
      { name: "To Do", value: statusCounts.todo },
      { name: "In Progress", value: statusCounts.inProgress },
      { name: "Review", value: statusCounts.review },
      { name: "Completed", value: statusCounts.completed },
    ];
  };

  const projectStatusData = StatusCounts();

  return (
    <div className="w-full pt-4">
      <h1
        className={`font-roboto mb-4 text-xl border-b  pb-3 ${
          mode ? "border-black/20" : "border-white/25"
        }`}
      >
        All Projects
      </h1>

      <div className="flex overflow-x-auto gap-5 mb-6 py-3 scrollbar-hide">
        {Project.length > 0 ? (
          Project.map((item) => (
            <ProjectCard
              key={item.uuid}
              heading={item.heading}
              description={item.description}
              status={item.status}
              startDate={item.startDate}
              deadline={item.deadline}
              team={item.team}
            />
          ))
        ) : (
          <div className="text-2xl font-bold w-full">
            No project exists. Create some to continue.
          </div>
        )}
      </div>

      <h1 className="font-roboto mb-4 text-xl">Analysis</h1>

      {Project.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-10 w-full items-start overflow-x-auto">
          <div className="w-full lg:w-1/3 min-w-[280px]">
            <StatusPieChart data={projectStatusData} />
          </div>

          <div className="w-full lg:w-2/3 min-w-[320px]">
            <LineChart data={ProStartEnd()} />
          </div>
        </div>
      )}
    </div>
  );
}
