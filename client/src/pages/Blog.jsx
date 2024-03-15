import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogContent from "./BlogContent";
import AuthCheckLog from "../components/AuthCheckLog";

const Blog = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <BlogContent />
        </div>
      ) : (
        <AuthCheckLog />
      )}
      {/* <BlogContent /> */}
    </div>
  );
};

export default Blog;
