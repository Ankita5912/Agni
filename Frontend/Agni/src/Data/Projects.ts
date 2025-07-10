import { v4 as uuidv4 } from 'uuid';

export type ProjectType = {
  uuid: string;
  heading: string;
  description: string;
  status: "To Do" | "In Progress" | "Completed" | "On Hold" | "Review";
  startDate: Date;
  deadline: Date;
  team: string;
};

const Project: ProjectType[] = [
  {
    uuid: uuidv4(),
    heading: "Build Landing Page",
    description: "Responsive landing page for the marketing campaign.",
    status: "To Do",
    deadline: new Date("2025-07-15"),
    startDate: new Date("2025-07-10"),
    team: "UI Team"
  },
  {
    uuid: uuidv4(),
    heading: "API Integration",
    description: "Integrate REST API for user authentication and project data.",
    status: "In Progress",
    deadline: new Date("2025-07-20"),
    startDate: new Date("2025-07-08"),
    team: "Backend Team"
  },
  {
    uuid: uuidv4(),
    heading: "Kanban UI Enhancement",
    description: "Improve drag-and-drop functionality and mobile responsiveness.",
    status: "Review",
    deadline: new Date("2025-07-18"),
    startDate: new Date("2025-07-05"),
    team: "Frontend Team"
  },
  {
    uuid: uuidv4(),
    heading: "Final Deployment",
    description: "Deploy the final version to production and monitor logs.",
    status: "Completed",
    deadline: new Date("2025-07-10"),
    startDate: new Date("2025-07-01"),
    team: "DevOps Team"
  }, 
  {
    uuid: uuidv4(),
    heading: "Build Landing Page",
    description: "Responsive landing page for the marketing campaign.",
    status: "To Do",
    deadline: new Date("2025-07-15"),
    startDate: new Date("2025-07-10"),
    team: "UI Team"
  },

];

export default Project;
