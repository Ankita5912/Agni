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

  interface NavSubItem {
    text: string;
    isActive: boolean;
    path: string;
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
        icon: <LayoutDashboard size={16} />,
      },
      {
        text: "Projects",
        isActive: false,
        path: "/",
        icon: <Rocket size={16} />,
      },
      {
        text: "Teams",
        isActive: false,
        path: "/tracks",
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

  return (
    <div
      className={`h-full w-60 flex flex-col fixed z-30 border-r top-16 sm:pl-10 pl-6 sm:px-8 px-4 sm:p-8 p-4 left-0 ${
        mode
          ? " text-[#444950] font-normal border-r-black/20"
          : " text-inherit border-r-white/25"
      } ${value ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col gap-2">
        {navsubItems.map((item, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <NavLink
              to={item.path}
              onClick={() => handleLink(index)}
              className={`flex flex-row gap-2 items-center transition-colors duration-200 antialiased tracking-wide font-poppins text-sm rounded-sm p-1.5 ${
                item.isActive
                  ? `text-[var(--primary-color)] font-medium ${
                      mode ? "" : "bg-[#50505047]"
                    }`
                  : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.text}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
