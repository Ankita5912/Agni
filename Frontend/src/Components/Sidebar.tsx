import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LayoutDashboard, Rocket, Users } from "lucide-react";
import type { RootState } from "../Redux/Reducers/rootReducer";
import type { JSX } from "react/jsx-runtime";


interface SidebarProp {
  value: boolean;
}

export default function Sidebar({ value }: SidebarProp) {
  const mode = useSelector((state: RootState) => state.mode.mode);
  const [openIndex, setOpenIndex] = useState<number | null>(1);
  const Project = useSelector((state: RootState) => state.Project.projects);

  const toggleSubitems = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  interface SubItem {
    heading?: string;
    path: string;
  }

  interface NavSubItem {
    text: string;
    isActive: boolean;
    path: string;
    pathExists: boolean;
    subitems: SubItem[];
    icon: JSX.Element;
  }

  interface NavItem {
    NavsubItems: NavSubItem[];
    profile: string;
  }

  const navitems: NavItem = {
    NavsubItems: [
      {
        text: "Dashboard",
        isActive: false,
        path: "/kanban/dashboard",
        pathExists: true,
        subitems: [],
        icon: <LayoutDashboard size={16} />,
      },
      {
        text: "Projects",
        isActive: false,
        path: "/kanban/project",
        pathExists: false,
        subitems: Project.map((proj) => ({
          heading: proj.heading,
          path: `/kanban/project/${proj.uuid}`,
        })),
        icon: <Rocket size={16} />,
      },
      {
        text: "Teams",
        isActive: false,
        path: "/teams",
        pathExists: false,
        subitems: [],
        icon: <Users size={16} />,
      },
    ],
    profile: "",
  };

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
      className={`h-full w-60 flex flex-col  fixed z-20 border-r top-16 sm:pl-10 pl-6 sm:px-8 px-4 sm:p-8 p-4 left-0 ${
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
                  className={`flex flex-row gap-2 items-center cursor-pointer transition-colors duration-200 antialiased tracking-wide font-poppins text-sm rounded-sm p-1.5 ${
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
                          `text-sm text-gray-500 hover:text-[var(--secondary-color)] cursor-pointer ${
                            isActive
                              ? "text-[color:var(--secondary-color)]"
                              : ""
                          }`
                        }
                        style={({ isActive }) =>
                          isActive ? { color: "var(--secondary-color)" } : {}
                        }
                      >
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
    </div>
  );
}
