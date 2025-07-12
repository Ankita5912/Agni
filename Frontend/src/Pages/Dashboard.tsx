import Project from "../Data/Projects";
import ProjectCard from "../Components/ProjectCard";
import StatusPieChart from "../Components/PieChart";

export default function ProjectDashboard() {
  
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
        default:
          break;
      }
    }

    return [
      { name: "To Do", value: statusCounts.todo },
      { name: "In Progress", value: statusCounts.inProgress },
      { name: "Review", value: statusCounts.review },
      { name: "Completed", value: statusCounts.completed },
    ];;
  };

  const projectStatusData = StatusCounts();
  

  return (
    <div className="">
      <h1 className="font-roboto mb-4 text-xl border-b pb-4">All Projects</h1>
      <div
        className="flex flex-row overflow-scroll gap-5 mb-5 p-5 mt-8 md:justify-start justify-center"
        style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
      >
        {Project.map((item) => (
          <ProjectCard
            key={item.uuid}
            heading={item.heading}
            description={item.description}
            status={item.status}
            startDate={item.startDate}
            deadline={item.deadline}
            team={item.team}
          />
        ))}
      </div>
      <h1 className="font-roboto mb-3 text-xl">Analysis</h1>
      <div className="h-40 w-96 mb-40">
        <StatusPieChart data={projectStatusData} />
      </div>
      <div>
        
      </div>
    </div>
  );
}