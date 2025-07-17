import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Reducers/rootReducer";
import { NavLink, Outlet } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";
import { FolderTree, Columns4, ListTodo, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProjectType } from "../Redux/Actions/projectAction";

export default function ProjectPage() {
  const mode = useSelector<RootState>((state) => state.mode.mode);
  const params = useParams();
  const projectId = params.projectId as string;
  //calling all the projects from redux
  const Project = useSelector((state: RootState) => state.Project.projects);
  //finding the project that match project uuid and storing it in project using setProject
  const [project, setProject] = useState<ProjectType | undefined>(undefined);

  type boardtype = {
    board: string;
    path: string;
    symbol: JSX.Element;
  };

  const projectBoards: boardtype[] = [
    {
      board: "Subtask",
      path: "summary",
      symbol: <FolderTree size={18} />,
    },
    {
      board: "Board",
      path: "board",
      symbol: <Columns4 size={18} />,
    },
    {
      board: "List",
      path: "list",
      symbol: <ListTodo size={18} />,
    },
  ];

  useEffect(() => {
    const findProject = () => {
      const result = Project.find((p) => p.uuid === projectId);
      setProject(result);
    };
    findProject();
  }, [projectId]);

  return (
    <div className={`pt-4 pr-4`}>
      <h5
        className={`font-roboto mb-2 text-[#555b63] px-2 ${
          mode ? "font-medium text-2sm " : " text-md  font-extralight"
        }`}
      >
        Projects
      </h5>

      <h1 className="mb-3 font-extrabold tracking-wide font-poppins text-2xl px-2">
        {project?.heading}
      </h1>

      <div
        className={`border-b flex flex-row gap-5 items-center justify-items-center overflow-auto mb-5 ${
          mode ? "border-black/20 " : "border-white/25"
        }`}
      >
        {projectBoards.map((items, index) => (
          <NavLink
            to={items.path}
            key={index}
            className={({ isActive }) =>
              `font-roboto p-2 flex flex-row gap-2 items-center tracking-wide text-[#555b63] ${
                mode ? "font-medium text-2sm " : "text-md  font-extralight"
              } ${
                isActive
                  ? "border-b-4 text-[var(--secondary-color)] items-center border-[var(--secondary-color)]"
                  : ` ${mode ? "" : " "}`
              }`
            }
          >
            <div>{items.symbol}</div>
            <div>{items.board}</div>
          </NavLink>
        ))}
        <div className="text-inherit font-medium">
          <Plus size={20} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
