import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import LogoA from "./Logo";
import {
  Moon,
  Sun,
  Bell,
  Search,
  EllipsisVertical,
  Settings,
  Palette,
  User,
  LogOut,
  PanelLeft,
} from "lucide-react";
import Notification from "./Notification";
import { useSelector, useDispatch } from "react-redux";
import { darkMode, lightMode } from "../Redux/Actions/modeActions";
import type { RootState } from "../Redux/Reducers/rootReducer";
import type { AppDispatch } from "../Redux/store";
import { logout } from "../Redux/Actions/authAction";
import {
  blueTheme,
  orangeTheme,
  purpleTheme,
  grayTheme,
} from "../Redux/Actions/themeActions";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const profileRef = useRef<HTMLDivElement>(null);

  const mode = useSelector((state: RootState) => state.mode.mode);
  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.auth.user);
  const [notification, setNotification] = useState<boolean>(false);
  const [profileOption, setprofileOption] = useState<boolean>(false);
  const navigate = useNavigate();

  type input = {
    inputValue: string;
  };

  const [inputChange, setInputChange] = useState<input>({
    inputValue: "",
  });

  const handleToggle = () => dispatch(mode ? lightMode() : darkMode());

  // type of navSubitems
  interface NavSubItem {
    text: string;
    isActive: boolean;
    path: string;
  }

  //type of Navitem
  interface NavItem {
    Name: string;
    NavsubItems: NavSubItem[];
    profile: string;
  }

  //Object containing navitem
  const navitems: NavItem = {
    Name: "AGNI",
    NavsubItems: [
      { text: "About", isActive: false, path: "/about" },
      { text: "About", isActive: false, path: "/about" },
      { text: "Services", isActive: false, path: "/services" },
      { text: "Contact", isActive: false, path: "/contact" },
    ],
    profile: "",
  };

  //destructuring some keys from object Navitems
  const { profile } = navitems;

  const [showLoginPage, setShowPage] = useState<boolean>(false);

  const [showSignupPage, setSignupPage] = useState<boolean>(false);

  //function to change the color of nav bar items when particular link is open according to theme color
  // const handleLink = (index: number) => {
  //   const updated = navsubItems.map((item, i) => ({
  //     ...item,
  //     isActive: i === index,
  //   }));
  //   setNavsubItems(updated);
  // };

  //changing the theme using the actions defined in the themeAction according to the input enter by the user if that matches with the themecolor
  const handleTheme = (themecolor: string) => {
    if (themecolor === "orange") {
      dispatch(orangeTheme());
    } else if (themecolor === "blue") {
      dispatch(blueTheme());
    } else if (themecolor === "purple") {
      dispatch(purpleTheme());
    } else {
      dispatch(grayTheme());
    }
  };

  //useEffect hook to track the mouse event to close the options under profile when profileOtions are true
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setprofileOption(false);
      }
    };
    if (profileOption) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [profileOption]);

  //dynamically changing the color mention in the index.css file to change it according to the theme colors store in redux store that are changing acc to user input
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--text-color", theme.textColor);
  }, [theme]);

  const [MobileMenu, setMobileMenu] = useState<boolean>(false);

  return (
    <div
      className={`flex justify-between items-center h-16 md
    sm:px-6 px-2 fixed top-0 w-full py-3 z-50 border-b  ${
      mode ? "border-black/20" : "border-white/25"
    }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 " onClick={() => navigate("/")}>
          <LogoA />
        </div>
        <div className="cursor-pointer">
          <PanelLeft
            size={22}
            strokeWidth={2}
            stroke="#444950"
            onClick={toggleSidebar}
          />
        </div>
      </div>

      <div></div>
      {/* <div
        className="lg:flex xl
      :gap-6 gap-5 hidden"
      >
        {navsubItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            onClick={() => handleLink(index)}
            className={`transition-colors duration-200 antialiased tracking-wide font-poppins text-sm ${
              item.isActive ? "text-[var(--primary-color)] font-semibold" : ""
            }`}
          >
            {item.text}
          </Link>
        ))}
      </div> */}

      <div className="flex flex-row gap-4">
        <div
          className={`xl:w-md sm:w-xs w-32 py-1 px-2.5 pl-3 rounded-sm sm:h-9 h-6 flex  items-center ${
            mode ? "bg-[#f8f9fa]" : "bg-[#242528]"
          }`}
        >
          <input
            type="text"
            className="w-full outline-none h-full tracking-wide font-poppins sm:text-sm text-xs font-light placeholder:text-inherit/10 placeholder:text-3sm"
            placeholder="Projects, subtasks , teams and so on"
            name="search"
            value={inputChange.inputValue}
            onChange={(e) => setInputChange({ inputValue: e.target.value })}
          />
          <Search size={18} strokeWidth={1} style={{ cursor: "pointer" }} />
        </div>
        <div className="" onClick={() => navigate("/create-project")}>
          <Button buttonName="Create" />
        </div>
      </div>

      <div
        className="lg:flex items-center xl:gap-8 sm hidden
      :gap-6 gap-4"
      >
        <div
          onClick={handleToggle}
          className={`lg:flex h-8 w-8 items-center justify-center rounded-sm hidden cursor-pointer transition-all duration-300
            ${
              mode
                ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)]"
                : "bg-inherit border border-gray-300"
            }`}
        >
          {mode ? (
            <Moon strokeWidth={2} size={20} className="" stroke="#c3c7cdff" />
          ) : (
            <Sun size={20} strokeWidth={2} stroke="#c3c7cdff" />
          )}
        </div>

        <div
          className="lg:flex hidden"
          onMouseEnter={() => {
            setNotification(true);
          }}
          onMouseLeave={() => {
            setNotification(false);
          }}
        >
          <Bell strokeWidth={2} size={20} stroke="#444950" />
          {notification ? <Notification /> : <></>}
        </div>

        {/*profile option*/}
        {user === null ? (
          <>
            <div onClick={() => setShowPage(true)}>
              <Button buttonName="Login" />
            </div>

            {/* LOGIN BACKDROP */}
            {showLoginPage && (
              <div className="fixed inset-0 z-50">
                <div
                  className={`fixed inset-0 bg-black/5 backdrop-blur-none`}
                  onClick={() => setShowPage(false)}
                ></div>
                <div
                  className={`flex items-center justify-center h-full ${
                    mode ? "bg-[#0b090963]" : "bg-[#2a292994]"
                  }`}
                >
                  <Login
                    signUpPage={(value) => {
                      setSignupPage(value);
                      setShowPage(false); // Close login when opening signup
                    }}
                    loginPage={setShowPage}
                  />
                </div>
              </div>
            )}

            {/* SIGNUP BACKDROP */}
            {showSignupPage && (
              <div className="fixed inset-0 z-50">
                <div
                  className="fixed inset-0 bg-black/5 backdrop-blur-none"
                  onClick={() => setSignupPage(false)}
                ></div>
                <div
                  className={`flex items-center justify-center h-full shadow-2xl ${
                    mode ? "bg-[#0b090963]" : "bg-[#2a292994]"
                  }`}
                >
                  <SignUp
                    loginPage={(value) => {
                      setShowPage(value);
                      setSignupPage(false); // Close signup when opening login
                    }}
                    signUpPage={setSignupPage}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div ref={profileRef}>
            <img
              src={undefined}
              alt="Profile"
              className="md:w-8 md:h-8 sm:h-7 sm:w-7 w-6 h-6  rounded-full"
              onClick={() => {
                setprofileOption(!profileOption);
              }}
            />
            {profileOption ? (
              <div
                className={`fixed right-5 top-16 rounded-md w-fit p-6 flex flex-col gap-2 border  text-inherit ${
                  mode
                    ? "border-black/20 bg-[#f8f9fa]"
                    : "border-white/25 bg-[#242528]"
                }`}
              >
                <div className="flex gap-2 items-center">
                  <User size={16} />
                  <span className="tracking-wide font-poppins text-sm antialiased">
                    Account
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <Settings size={16} strokeWidth={2} />
                  <span className="tracking-wide font-poppins text-sm antialiased">
                    Settting
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="tracking-wide font-poppins text-sm antialiased flex gap-2 items-center">
                    <Palette size={16} />
                    Theme
                  </h1>
                  <div className="flex gap-3">
                    <div
                      className="h-6 w-6 bg-[#F46B45] rounded-full cursor-pointer"
                      onClick={() => {
                        handleTheme("orange");
                      }}
                    />
                    <div
                      className="h-6 w-6 bg-[#4776E6] rounded-full cursor-pointer"
                      onClick={() => {
                        handleTheme("blue");
                      }}
                    />
                    <div
                      className="h-6 w-6 bg-[#99A5FF] rounded-full cursor-pointer"
                      onClick={() => {
                        handleTheme("purple");
                      }}
                    />
                    <div
                      className="h-6 w-6 bg-[#E1F7F9] rounded-full cursor-pointer"
                      onClick={() => {
                        handleTheme("gray");
                      }}
                    />
                  </div>
                  <div
                    className="tracking-wide font-poppins text-sm antialiased flex gap-2 items-center"
                    onClick={() => dispatch(logout())}
                  >
                    <LogOut size={16} />
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>

      <div className="lg:hidden flex flex-row gap-2">
        <img
          src={profile}
          alt="Profile"
          className="md:w-8 md:h-8 sm:h-7 sm:w-7 w-6 h-6 rounded-full"
        />

        <div className="">
          <EllipsisVertical size={22} onClick={() => setMobileMenu(true)} />
        </div>
      </div>

      {MobileMenu ? (
        <>
          <div
            className={`fixed inset-0 z-40 ${
              mode ? " bg-black/5" : "bg-white/10"
            }`}
            onClick={() => setMobileMenu(false)}
          />

          {/* Mobile Drawer */}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-3/4 sm:w-1/2 md:w-1/3   shadow-lg transform transition-transform duration-300 ease-in-out ${
              MobileMenu ? "translate-x-0" : "translate-x-full"
            } ${mode ? "bg-white text-inherit" : "bg-black text-inherit"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold font-poppins">Menu</h2>
              <button onClick={() => setMobileMenu(false)}>
                <span className="text-xl font-bold">&times;</span>
              </button>
            </div>

            {/* Navigation Links */}
            {/* <div className="flex flex-col gap-4 p-4">
              {navsubItems.map((item, index) => (
                <Link
                  to={item.path}
                  key={index}
                  onClick={() => {
                    handleLink(index);
                    setMobileMenu(false);
                  }}
                  className={`font-poppins text-sm font-light tracking-wide transition-all duration-150 ${
                    item.isActive
                      ? "text-[var(--primary-color)] font-semibold"
                      : ""
                  }`}
                >
                  {item.text}
                </Link>
              ))}
            </div> */}

            <hr className="my-2 border-gray-300" />

            {/* Settings & Theme */}
            <div className="p-4 flex flex-col gap-3">
              <span className="font-poppins text-sm font-medium">Account</span>
              <span className="font-poppins text-sm font-light tracking-wide">
                Settings
              </span>

              <div className="mt-4">
                <h3 className="font-poppins text-sm font-medium mb-2">Theme</h3>
                <div className="flex gap-3">
                  <div
                    className="h-6 w-6 rounded-full bg-[#F46B45] cursor-pointer"
                    onClick={() => handleTheme("orange")}
                  />
                  <div
                    className="h-6 w-6 rounded-full bg-[#4776E6] cursor-pointer"
                    onClick={() => handleTheme("blue")}
                  />
                  <div
                    className="h-6 w-6 rounded-full bg-[#99A5FF] cursor-pointer"
                    onClick={() => handleTheme("purple")}
                  />
                  <div
                    className="h-6 w-6 rounded-full bg-[#E1F7F9] cursor-pointer"
                    onClick={() => handleTheme("gray")}
                  />
                </div>
              </div>
              <div
                className="tracking-wide font-poppins text-sm antialiased flex gap-2 items-center"
                onClick={() => dispatch(logout())}
              >
                <LogOut size={16} />
                Logout
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
