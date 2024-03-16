import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxAvatar } from "react-icons/rx";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const BlogContent = () => {
  const [sidebar, setSidebar] = useState(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("blogid");
  const getSinglePost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/getpost/${blogId}`, { withCredentials: true });
      // const post = await res.data;
      console.log(res);
      setPost(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(post);

  useEffect(() => {
    getSinglePost();
  }, []);

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
      <div className="">
        <div className="pt-6">
          <p className="font-Kanit font-bold pl-4 text-4xl">
            {post.title}
          </p>
        </div>
        <div className="flex pt-4">
          <div className="basis-1/3 flex justify-end">
            <div className="pr-4">
              <RxAvatar className="w-[3rem] h-[3rem]" />
            </div>
          </div>
          <div className="basis-2/3 font-Kanit">
            <p className="">{post.authorName}</p>
            <button className="border rounded-md font-ClimateCrisis px-4 bg-red-400 text-base py-1">
              Follow
            </button>
          </div>
        </div>
      </div>
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
      <div className="mt-8">
        <div className="px-2 font-Kanit text-2xl">
          {post.content}
        </div>
      </div>
    </>
  );
};

export default BlogContent;
