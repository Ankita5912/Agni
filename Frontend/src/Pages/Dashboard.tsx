import Project from "../Data/Projects";
import ProjectCard from "../Components/ProjectCard";
export default function ProjectDashboard() {
  return (
    <div className="">
      <h1 className="font-roboto mb-4 text-xl">All Projects</h1>
      <div
        className="flex flex-row overflow-scroll gap-5 mb-10 md:justify-start justify-center"
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
      <h1 className="font-roboto mb-4 text-xl">Analysis</h1>
    </div>
  );
}