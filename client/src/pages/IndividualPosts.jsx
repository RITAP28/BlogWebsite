import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function IndividualPosts() {
  const [sidebar, setSidebar] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("Id");
  const navigate = useNavigate();
  const getAllPostsIndividually = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/user/numberofposts/${userId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPostsIndividually();
  }, [userId]);
  return (
    <>
      {sidebar ? (
        <div className="bg-teal-950 w-screen h-screen">
          <Sidebar setSidebar={setSidebar} />
        </div>
      ) : (
        <div className="w-screen h-[4rem] bg-teal-950">
          <Navbar setSidebar={setSidebar} />
        </div>
      )}
      <div className="">
        <div className="w-full h-[13rem] bg-teal-950">
          <div className="font-Kanit text-green-400 text-3xl">
            <p className="ml-4 pt-6">Hello,</p>
            <p className="text-6xl ml-4">{currentUser.username}</p>
          </div>
        </div>
        <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden -mt-16">
          <RxAvatar className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-center py-4">
        <div className="font-Kanit text-lg underline">
          Here are all your lovely posts
        </div>
      </div>
      <div className="">
        {loading
          ? "Fetching your posts..."
          : posts
              .map((blog, index) => (
                <div
                  key={index}
                >
                  <div 
                    className="hover:bg-slate-100 hover:cursor-pointer"
                    onClick={() => {
                        navigate(
                          `/blog?author=${blog.authorName}&blogid=${blog._id}`
                        );
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
                    <div className="pl-6 pb-4 font-Kanit basis-2/3">
                      Category
                    </div>
                    <div className="basis-1/3 flex">
                      {/* <div className="text-2xl px-2">
                        <MdOutlineBookmarkAdd />
                      </div>
                      <div className="text-2xl px-2">
                        <IoIosRemoveCircleOutline />
                      </div>
                      <div className="text-2xl px-2">
                        <IoIosMore
                          onClick={handleMoreDropdown}
                        />
                      </div> */}
                      <div className="basis-1/2 pr-2">
                        <button className="bg-red-400 px-4 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-Kanit text-white hover:cursor-pointer">Edit</button>

                      </div>
                      <div className="basis-1/2 pr-2">
                        <button className="bg-red-400 px-4 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-Kanit text-white hover:cursor-pointer">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <hr className="w-[80%]" />
                  </div>
                </div>
              ))
              .reverse()}
      </div>
    </>
  );
}

export default IndividualPosts;
