import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditBlog() {
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("blogid");
  const getSinglePost = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(`http://localhost:3000/user/getpost/${blogId}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
        });
      console.log(post);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleContent(e) {
    setContent(e.target.value);
  }

  const handleUpdateBlog = async () => {
    setBtnLoading(true);
    try {
      await axios.put(
        `http://localhost:3000/user/updatedblog/${blogId}`,
        {
          title: title,
          content: content,
        },
        { withCredentials: true }
      );
      setPost();
      setTitle();
      setContent();
      window.alert('Blog updated successfully')
    navigate(-1);
    } catch (error) {
      console.error(error);
    }
    setBtnLoading(false);
  };

  useEffect(() => {
    getSinglePost();
  }, [blogId]);
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
      {loading ? (
        "Fetching all the data of this blog..."
      ) : (
        <div>
          <div className="w-full flex justify-end">
            <div className="p-4">
              <button 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg shadow-lg text-white font-Kanit text-base hover:cursor-pointer"
                onClick={handleUpdateBlog}
            >
                {btnLoading ? "Updating Blog..." : "Update Blog"}
              </button>
            </div>
          </div>
          {/* Title */}
          <div className="">
            <textarea
              id="title"
              className="pl-2 py-4 text-3xl font-bold font-Kanit w-[90%] whitespace"
              placeholder="Title"
              defaultValue={title}
              onChange={handleTitle}
            />
          </div>
          {/* Content */}
          <div className="">
            {/* <TipTapEditor /> */}
            <textarea
              id="content"
              className="w-full pl-2 py-4 font-sans text-lg h-screen"
              placeholder="Write Here"
              defaultValue={content}
              onChange={handleContent}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default EditBlog;
