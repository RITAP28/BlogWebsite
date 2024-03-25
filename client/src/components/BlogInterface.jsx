import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { Blogs } from "../redux/Inputs/BlogInputs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const BlogInterface = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const getPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/getallposts");
      setPosts(res.data);
      // console.log(res.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts
        .map((blog, index) => (
          <div key={index}>
            <div
              className="hover:bg-slate-100 hover:cursor-pointer"
              onClick={() => {
                navigate(`/blog?author=${blog.authorName}&blogid=${blog._id}`);
              }}
            >
              <div className="flex flex-row mt-2">
                {/* div for the info */}
                <div className="basis-2/3 mt-4">
                  {/* div for the header */}
                  <div className="flex flex-row">
                    {/* div for avatar */}
                    <div className="basis-1/4 flex justify-center items-center">
                      <RxAvatar className="text-2xl" />
                    </div>
                    {/* div for name */}
                    <div className="basis-2/4 text-base font-Kanit">
                      {blog.authorName}
                    </div>
                    {/* div for date */}
                    <div className="basis-1/4 font-Kanit">
                      {new Date(blog.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  {/* div for the title */}
                  <div className="flex justify-center items-center my-8">
                    <p className="font-Kanit font-bold text-xl w-[80%]">
                      {blog.title}
                    </p>
                  </div>
                </div>
                {/* div for photo */}
                <div className="basis-1/3 flex justify-center items-center">
                  <div className="w-[80%] h-[90%]">
                    <img
                      src="../../public/pic6.jpg"
                      className="w-full h-full object-contain"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* div for the category */}
            <div className="flex flex-row pt-2">
              <div className="pl-6 pb-4 font-Kanit basis-2/3">Category</div>
              {( currentUser && blog.authorName === currentUser.username) ? (
                <div className="basis-1/3 flex">
                  <div className="basis-1/2 pr-2">
                    <button className="bg-red-400 px-4 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-Kanit text-white hover:cursor-pointer">
                      Edit
                    </button>
                  </div>
                  <div className="basis-1/2 pr-2">
                    <button className="bg-red-400 px-4 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-Kanit text-white hover:cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="basis-1/3 flex ">
                    <div className="text-2xl px-2">
                      <MdOutlineBookmarkAdd />
                    </div>
                    <div className="text-2xl px-2">
                      <IoIosRemoveCircleOutline />
                    </div>
                    <div className="text-2xl px-2">
                      <IoIosMore />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-center items-center">
              <hr className="w-[80%]" />
            </div>
          </div>
        ))
        .reverse()}
    </div>
  );
};

export default BlogInterface;
