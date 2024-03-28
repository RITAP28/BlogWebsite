import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import BlogInterface from "./components/BlogInterface";
import UserFunction from "./components/UserFunction";
import axios from "axios";
import { ExistingUser } from "./redux/Slices/userSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/me", {
        withCredentials: true,
      });
      console.log(res.data.user);
      dispatch(ExistingUser(res.data.user));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {sidebar ? (
        <div className="bg-teal-950 w-screen h-screen">
          <Sidebar setSidebar={setSidebar} />
        </div>
      ) : (
        <div className="w-screen h-[4rem] bg-teal-950">
          <Navbar setSidebar={setSidebar} />
        </div>
      )}
      <div className="w-screen">
        <UserFunction />
      </div>
      <div className="w-screen">
        <BlogInterface />
      </div>
    </div>
  );
};

export default Home;
