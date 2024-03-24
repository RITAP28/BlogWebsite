import React, { useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import ContentSpace from "./ContentSpace";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const NewBlog = () => {
  const { currentUser, Google, Normal } = useSelector((state) => state.user);
  const [draftConfirm, setDraftConfirm] = useState(false);
  const [treeLoading, setTreeLoading] = useState(false);
  const [draft, setDraft] = useState(false);
  const [showProfileDropdown, setShowProfileDropDown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [title, setTitle] = useState('');
  const [textarea, setTextArea] = useState('');
  const [parsedData, setParsedData] = useState();
  // only available for google accounts
  // const parsedData = JSON.parse(currentUser.config.data);
  function diffProfiles(){
    if(Google){
      setParsedData(JSON.parse(currentUser.config.data));
    } else if(Normal){
      setParsedData(currentUser);
    };
  };
  const toggleProfileDropdown = () => {
    if (showProfileDropdown === false) {
      setShowProfileDropDown(true);
      setShowMoreDropdown(false);
    } else {
      setShowProfileDropDown(false);
      setShowMoreDropdown(false);
    }
  };
  const toggleMoreDropdown = () => {
    if (showMoreDropdown === false) {
      setShowMoreDropdown(true);
      setShowProfileDropDown(false);
    } else {
      setShowMoreDropdown(false);
      setShowProfileDropDown(false);
    }
  };
  const navigate = useNavigate();
  function handleOnClose(e) {
    if (e.target.id === "popupsavedraftform") {
      setDraftConfirm(false);
    }
  }
  function handleTitle(e) {
    setDraft(true);
    setTitle(e.target.value);
  }
  function handleTextArea(e){
    setTextArea(e.target.value);
  }
  async function handlePublish() {
    setTreeLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/user/new-story",
        {
          title: title,
          content: textarea,
        },
        { withCredentials: true }
      );
      setTitle('');
      setTextArea('');
      console.log(res);
      navigate("/");
      window.alert("Blog published successfully!");
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong while publishing");
    }
    setTreeLoading(false);
  }
  useEffect(() => {
    diffProfiles();
  }, [Google, Normal]);
  return (
    <>
      {draft && draftConfirm && (
        <div
          id="popupsavedraftform"
          className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex justify-center items-center"
          onClick={handleOnClose}
        >
          <div className="">
            <div className="w-full max-w-xs p-4 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
              <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="flex items-center py-2">
                  <div className="basis-1/2 flex justify-start">
                    <p className="font-Kanit text-lg">Save Changes</p>
                  </div>
                  <div className="basis-1/2 flex justify-end">
                    <IoMdCloseCircle
                      className="text-xl hover:cursor-pointer"
                      onClick={() => setDraftConfirm(false)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="">
                    Do you want to save this Draft to your Profile?
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-green-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    No
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showProfileDropdown && (
        <div
          className="absolute right-8 mt-[3rem] p-2 bg-white border-2 shadow-md rounded z-10"
          id="dropdown"
        >
          <div className="flex flex-row">
            <div className="basis-1/3 flex justify-center items-center">
              <div className="w-1/2 h-1/2 rounded-full">
                {parsedData.profilePicture ? (
                  <Avatar
                    className="h-full w-full object-cover"
                    img={parsedData.profilePicture}
                  />
                ) : (
                  <RxAvatar className="h-full w-full object-cover" />
                )}
                {/* {null} */}
              </div>
            </div>
            <div className="basis-2/3">
              <div className="w-full text-black font-Kanit flex justify-start pl-4 item-center">
                {/* {parsedData ? parsedData.username : currentUser.username} */}
                {parsedData.username}
              </div>
              <div className="w-full font-Kanit">
                @
                {Google
                  ? parsedData.email
                      .toLowerCase()
                      .split(" ")
                      .join("")
                      .slice(0, 15)
                  : parsedData.username}
                {/* {currentUser.email.toLowerCase().split(" ").join("").slice(0, 15)} */}
                {/* {null} */}
              </div>
            </div>
          </div>
          <ul
            className="py-2 text-sm dark:text-gray-200 font-Kanit"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Profile
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/library">Library</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/stories">Stories</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/stats">Stats</Link>
            </li>
            <hr className="text-lg" />
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/manage">Manage Publications</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/help">Help</Link>
            </li>
            <hr className="text-lg" />
            <li className="block px-4 pt-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md pb-2">
              <Link to="/signout">Sign out</Link>
            </li>
          </ul>
        </div>
      )}
      {showMoreDropdown && (
        <div
          className="absolute right-16 mt-[3rem] p-2 bg-white border-2 shadow-md rounded z-10"
          id="dropdown"
        >
          <ul
            className="py-2 text-sm dark:text-gray-200 font-Kanit"
            aria-labelledby="dropdownDefaultButton"
          >
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/settings">Settings</Link>
            </li>
            <li className="block px-4 py-2 text-black hover:cursor-pointer hover:bg-slate-100 rounded-md">
              <Link to="/signout">Sign out</Link>
            </li>
          </ul>
        </div>
      )}
      <div>
        {/* Navbar */}
        <div className="flex w-full h-[3rem] font-Kanit bg-teal-950">
          <div className="basis-1/2 flex">
            <div
              className="font-Kanit text-lg font-bold text-green-400 flex justify-center items-center pl-4 pr-2 hover:cursor-pointer"
              onClick={() => {
                setDraftConfirm(true);
              }}
            >
              RitapBlogs
            </div>
            <div className="px-2 flex justify-center items-center text-white">
              {draft ? "Draft Saved" : null}
            </div>
          </div>
          <div className="basis-1/2 flex flex-row justify-end text-white">
            <div className="flex justify-end items-center px-2">
              <button
                className="bg-green-400 px-2 py-1 rounded-xl text-teal-950 font-bold hover:cursor-pointer"
                onClick={handlePublish}
                disabled={treeLoading}
              >
                {treeLoading ? "Publishing..." : "Publish"}
              </button>
            </div>
            <div
              className="flex justify-center items-center px-2"
              onClick={toggleMoreDropdown}
            >
              <IoIosMore className="text-2xl hover:cursor-pointer" />
            </div>
            <div
              className="flex justify-start items-center pl-2 pr-4"
              onClick={toggleProfileDropdown}
            >
              <RxAvatar className="text-2xl hover:cursor-pointer" />
            </div>
          </div>
        </div>
        {/* space to write */}
        <div
          className="absolute max-h-screen w-full"
          onClick={(prev) => {
            setShowMoreDropdown(!prev);
            setShowProfileDropDown(!prev);
          }}
        >
          {/* <ContentSpace setDraft={setDraft} /> */}
          <div>
            {/* Title */}
            <div className="py-4">
              <input
                id="title"
                type="text"
                className="pl-2 py-4 text-3xl font-bold font-Kanit w-full"
                placeholder="Title"
                onChange={handleTitle}
              />
            </div>
            {/* Content */}
            <div className="">
              {/* <TipTapEditor /> */}
              <textarea
                name=""
                id="content"
                className="w-full pl-2 py-4 font-sans text-lg h-screen"
                placeholder="Write Here"
                onChange={handleTextArea}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBlog;
