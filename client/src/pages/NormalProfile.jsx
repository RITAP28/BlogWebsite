import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NormalProfile() {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("Id");
  async function getNumberOfPosts() {
    try {
      // setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/user/numberofposts/${userId}`,
        { withCredentials: true }
      );
      setPosts(res.data);
      // setLoading(false);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    getNumberOfPosts();
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
      <div>
        <div className="w-full h-[13rem] bg-teal-950">
          <div className="font-Kanit text-green-400 text-3xl">
            <p className="ml-4 pt-6">Hello,</p>
            <p className="text-6xl ml-4">{currentUser.username}</p>
          </div>
        </div>
        <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden -mt-16">
          <RxAvatar className="w-full h-full" />
        </div>
        <div className="w-full">
          <div className="flex font-Kanit gap-2">
            <div 
              className="basis-1/3 flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 rounded-lg shadow-lg"
              onClick={() => {
                navigate(`/profile/posts?user=${currentUser.username}&Id=${userId}`);
              }}
            >
              <div className="flex flex-col">
                <p className="flex justify-center text-2xl text-white">
                  {posts.length}
                </p>
                <p className="flex justify-center text-2xl -mt-2">Posts</p>
              </div>
            </div>
            <div className="basis-1/3 flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 rounded-lg shadow-lg">
              <div className="flex flex-col">
                <p className="flex justify-center text-2xl text-white">100</p>
                <p className="flex justify-center text-2xl -mt-2">Followers</p>
              </div>
            </div>
            <div className="basis-1/3 flex justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 rounded-lg shadow-lg">
              <div className="flex flex-col">
                <p className="flex justify-center text-2xl text-white">200</p>
                <p className="flex justify-center text-2xl -mt-2">Following</p>
              </div>
            </div>
          </div>
          {/* Maximum 3 posts appear in the profile */}
          <div className="font-Kanit p-2 mt-4 text-xl">Your Recent Draft</div>
          <div className="font-Kanit p-2 text-xl">Your Posts</div>
          <div className="font-Kanit p-2 text-xl">About Yourself</div>
          <div className="font-Kanit p-2 text-xl">Billing</div>
          <div className="">
            
            {!posts
              ? "Loading..."
              : posts
                  .map((blog, index) => {
                    <div
                      key={index}
                      className="hover:bg-slate-100 hover:cursor-pointer"
                      onClick={() => {
                        navigate(
                          `/blog?author=${blog.authorName}&blogid=${blog._id}`
                        );
                      }}
                    >
                      <div className="flex flex-row mt-2">
                        <div className="basis-2/3 mt-4">
                          {/* div for the header */}
                          <div className="flex flex-row">
                            <div className="basis-1/4 flex justify-center items-center">
                              <RxAvatar className="text-2xl" />
                            </div>
                            {/* div for date */}
                            <div className="basis-1/4 font-Kanit">
                              {new Date(blog.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex justify-center items-center my-8">
                            <p className="font-Kanit font-bold text-xl w-[80%]">
                              {blog.title}
                            </p>
                          </div>
                        </div>
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
                      <div className="flex flex-row pt-2">
                        <div className="pl-6 pb-4 font-Kanit basis-2/3">
                          Category
                        </div>
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
                      <div className="flex justify-center items-center">
                        <hr className="w-[80%]" />
                      </div>
                    </div>;
                  })
                  .reverse()}
          </div>
        </div>
      </div>
    </>
  );
}

export default NormalProfile;
