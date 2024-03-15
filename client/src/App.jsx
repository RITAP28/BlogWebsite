import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Blog from "./pages/Blog";
import { useSelector } from "react-redux";
import NewBlog from "./pages/BlogPages/NewBlog";
import Profile from "./pages/Profile";

const App = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/blog"
          element={<Blog />}
        />

        {/* protected routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoutes>
              <About />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/new-story"
          element={
            <ProtectedRoutes>
              <NewBlog />
            </ProtectedRoutes>
          }   
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }   
        />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
