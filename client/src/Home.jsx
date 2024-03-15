import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BlogInterface from "./components/BlogInterface";
import UserFunction from "./components/UserFunction";

const Home = () => {
  const [sidebar, setSidebar] = useState(false);
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
