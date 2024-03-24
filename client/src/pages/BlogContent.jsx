import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const BlogContent = () => {
  const [sidebar, setSidebar] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("blogid");
  const getSinglePost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/getpost/${blogId}`,
        { withCredentials: true }
      );
      setPost(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSinglePost();
  }, [blogId]);

  return (
    <>
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
      </div>
      {post && (
        <>
          <div className="">
            <div className="pt-6">
              <p className="font-Kanit font-bold pl-4 text-4xl">
                {post.title}
                {/* Title */}
              </p>
            </div>
            <div className="flex pt-4">
              <div className="basis-1/3 flex justify-end">
                <div className="pr-4">
                  <RxAvatar className="w-[3rem] h-[3rem]" />
                </div>
              </div>
              <div className="basis-2/3 font-Kanit">
                <p className="font-bold">
                  {post.authorName}
                  {/* Author */}
                </p>
                {currentUser.username === post.authorName ? (
                  <p className="font-Kanit text-sm">
                    Published on {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                ) : (
                  <button className="border rounded-md font-ClimateCrisis px-4 bg-red-400 text-base py-1">
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>

          {currentUser.username !== post.authorName ? (
            <div>
              <div className="flex mt-4">
                <div className="basis-1/3 flex justify-center">
                  <button className="border rounded-md font-Kanit font-bold text-lg px-2 hover:cursor-pointer hover:bg-slate-200">
                    Share
                  </button>
                </div>
                <div className="basis-1/3 flex justify-center">
                  <button className="border rounded-md font-Kanit font-bold text-lg px-2 hover:cursor-pointer hover:bg-slate-200">
                    Like
                  </button>
                </div>
                <div className="basis-1/3 flex justify-center">
                  <button className="border rounded-md font-Kanit font-bold text-lg px-2 hover:cursor-pointer hover:bg-slate-200">
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex mt-4">
                <div className="basis-1/3 flex justify-center">
                  <button 
                    className="border rounded-md font-Kanit font-bold text-lg px-4 py-1 hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    onClick={() => {
                      navigate(`/blog/edit?author=${post.authorName}&blogid=${blogId}`)
                    }}
                  >
                    Edit
                  </button>
                </div>
                <div className="basis-1/3 flex justify-center">
                  <button className="border rounded-md font-Kanit font-bold text-lg px-4 py-1 hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    Delete
                  </button>
                </div>
                <div className="basis-1/3 flex justify-center">
                  <button className="border rounded-md font-Kanit font-bold text-lg px-4 py-1 hover:cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    Share this 
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="px-2 font-Kanit text-2xl">
              {post.content}
              {/* Content */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogContent;
