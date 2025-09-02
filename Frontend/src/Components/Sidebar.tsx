import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LayoutDashboard, Rocket, Users, ArrowUpRight, Group, LogOut } from "lucide-react";
import type { RootState } from "../Redux/Reducers/rootReducer";
import type { JSX } from "react/jsx-runtime";
import type { AppDispatch } from "../Redux/store";
import { fetchProjects } from "../Redux/Slice/projectSlice";
import type { ProjectType } from "../Redux/Slice/projectSlice";
import { fetchTeams, type Team } from "../Redux/Slice/teamSlice";

interface SidebarProp {
  value: boolean;
  teamFormstatus: () => void;
}

export default function Sidebar({ value, teamFormstatus }: SidebarProp) {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const Project = useSelector(
    (state: RootState) => state.Project.projects
  ) as ProjectType[];
  const team = useSelector((state: RootState) => state.team.teams) as Team[];

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTeams())
  }, [dispatch]);

  const toggleSubitems = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  interface SubItem {
    heading?: string;
    path: string;
  }

  interface NavSubItem {
    text: string;
    path: string;
    pathExists: boolean;
    subitems: SubItem[];
    icon: JSX.Element;
  }

  interface NavItem {
    NavsubItems: NavSubItem[];
    profile: string;
  }


  useEffect(() => {
    setNavsubItems([
      {
        text: "Dashboard",
        path: "/kanban/dashboard",
        pathExists: true,
        subitems: [],
        icon: <LayoutDashboard size={16} />,
      },
      {
        text: "Projects",
        path: "/kanban/project",
        pathExists: false,
        subitems: Project.map((proj) => ({
          heading: proj.heading,
          path: `/kanban/project/${proj._id}`,
        })),
        icon: <Rocket size={16} />,
      },
      {
        text: "Teams",
        path: "/teams",
        pathExists: false,
        subitems: team.map((team) => ({
          heading: team.teamId,
          path: `/teams/${team.teamId}`,
        })),
        icon: <Users size={16} />,
      },
    ]);
  }, [Project, team]);

  const navitems: NavItem = {
    NavsubItems: [
      {
        text: "Dashboard",
        path: "/kanban/dashboard",
        pathExists: true,
        subitems: team.map((team) => ({
          heading: team.teamId,
          path: `/teams/${team.teamId}`,
        })),
        icon: <LayoutDashboard size={16} />,
      },
      {
        text: "Projects",
        path: "/kanban/project",
        pathExists: false,
        subitems: Project.map((proj) => ({
          heading: proj.heading,
          path: `/kanban/project/${proj._id}`,
        })),
        icon: <Rocket size={16} />,
      },
      {
        text: "Teams",
        path: "/teams",
        pathExists: false,
        subitems: [],
        icon: <Users size={16} />,
      },
    ],
    profile: "",
  };

  const projectIcons = [
    "/projectIcon1.png",
    "/projectIcon2.png",
    "/projectIcon3.png",
    "/projectIcon4.png",
    "/projectIcon5.png",
  ];
  const randomProjectIcons = Math.floor(Math.random() * projectIcons.length);
  const randomImageUrl = projectIcons[randomProjectIcons];

  const [navsubItems, setNavsubItems] = useState<NavSubItem[]>(
    navitems.NavsubItems
  );

  const handleLink = (index: number) => {
    const updated = navsubItems.map((item, i) => ({
      ...item,
      isActive: i === index,
    }));
    setNavsubItems(updated);
  };

  //mode ? "bg-[#f8f9fa]" : "bg-[#242528]"
  return (
    <div
      className={`h-full w-64 flex flex-col  fixed z-20 border-r top-14 sm:pl-10 pl-6 sm:px-8 px-4 sm:p-8 p-4 left-0 ${
        mode
          ? " text-[#444950] font-normal sm:bg-inherit bg-[#f8f9fa] border-r-black/20"
          : " text-inherit border-r-white/25 sm:bg-inherit bg-[#242528]"
      } ${value ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col gap-2">
        {navsubItems.map((item, index) => (
          <div className="flex flex-col gap-1" key={index}>
            {item.pathExists ? (
              <NavLink
                to={item.path}
                onClick={() => handleLink(index)}
                className={({ isActive }) =>
                  `flex flex-row gap-2 items-center transition-colors duration-200 antialiased tracking-wide font-poppins text-sm rounded-sm p-1.5 ${
                    isActive
                      ? `text-[color:var(--secondary-color)] font-medium ${
                          mode ? "" : "bg-[#50505047]"
                        }`
                      : ""
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { color: "var(--secondary-color)" } : {}
                }
              >
                <span>{item.icon}</span>
                {item.text}
              </NavLink>
            ) : (
              <>
                <div
                  className={`flex flex-row gap-2 items-center cursor-pointer transition-colors duration-300 antialiased tracking-wide font-poppins text-sm rounded-sm p-1.5 ${
                    mode ? "" : ""
                  }`}
                  onClick={() => toggleSubitems(index)}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
                {openIndex === index && item.subitems.length > 0 && (
                  <div className="ml-6 mt-1 flex flex-col gap-1 space-y-2">
                    {item.subitems.map((sub, subIdx) => (
                      <NavLink
                        to={sub.path}
                        key={subIdx}
                        className={({ isActive }) =>
                          `text-sm text-inherit/10 hover:text-[var(--secondary-color)] cursor-pointer flex gap-1 items-center ${
                            isActive
                              ? "text-[color:var(--secondary-color)]"
                              : ""
                          }`
                        }
                        style={({ isActive }) =>
                          isActive ? { color: "var(--secondary-color)" } : {}
                        }
                      >
                        <span>
                          <img
                            src={randomImageUrl}
                            className="h-5 w-5 rounded-sm"
                          />
                        </span>
                        {sub.heading}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* bottom options */}
      <div
        className={`absolute bottom-20 flex-col gap-4  bg-inherit ${
          mode ? "text-[#444950] font-normal" : "text-inherit "
        }`}
      >
        <div
          className="flex items-center gap-10 antialiased tracking-wide font-poppins text-sm mb-2 cursor-pointer"
          onClick={teamFormstatus}
        >
          <span className="flex gap-2 items-center">
            <Group size={16} />
            {"  "}Create Team{" "}
          </span>
          <span>
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="antialiased tracking-wide font-poppins text-sm flex gap-2 items-center cursor-pointer" onClick={()=> localStorage.removeItem('token')}>
          <span>
            <LogOut size={16} />
          </span>
          Logout <span></span>
        </div>
      </div>
    </div>
  );
}
