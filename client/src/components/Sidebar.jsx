import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { UserNotExist } from "../redux/Slices/userSlice";
import axios from "axios";

const Sidebar = ({ setSidebar }) => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MenuList = [
    {
      link: "Categories",
    },
    {
      link: "Browse",
    },
    {
      link: "Instructors",
    },
    {
      link: "Courses",
    },
  ];

  const handleLogout = async () => {
    try {
      const data = await axios
        .post("http://localhost:3000/user/logout", { withCredentials: true })
        .then(() => {
          navigate("/");
          setSidebar(false);
          dispatch(UserNotExist());
          window.alert("User Logged out successfully");
        });
    } catch (error) {
      window.alert("Logout unsuccessful")
      throw error;
    }
  };

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  return (
    <div
      className="w-full h-screen top-0 right-0 fixed overflow-y-auto  overflow-hidden transition-transform bg-teal-950 z-40"
      tabIndex={-1}
    >
      <div className="flex justify-end">
        <div className="p-6">
          <IoCloseCircle
            className="text-4xl text-green-500 hover:cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        </div>
      </div>
      <div className="pt-12">
        <ul className="font-medium space-y-2 list-none">
          {MenuList.map((item) => {
            return (
              <div className="flex justify-center items-center">
                <li className="flex font-RobotoMono text-400 justify-center items-center p-2 text-3xl rounded-lg dark:text-green-400 hover:bg-teal-700 dark:group-hover:text-white hover:cursor-pointer w-[80%]">
                  {item.link}
                </li>
              </div>
            );
          })}
          {!isAuthenticated ? (
            <div className="flex justify-center items-center pt-20">
              <li className="flex justify-evenly font-RobotoMono text-400 items-center p-2 text-xl rounded-lg dark:text-green-400 w-full">
                <button
                  className="border hover:bg-teal-700 hover:cursor-pointer px-6 py-2 rounded-md"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="border hover:bg-teal-700 hover:cursor-pointer px-4 py-2 rounded-md"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </li>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <li className="flex justify-center font-RobotoMono text-400 items-center p-2 text-xl rounded-lg dark:text-green-400 w-full">
                <button
                  className="border hover:bg-teal-700 hover:cursor-pointer px-6 py-2 rounded-md"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
