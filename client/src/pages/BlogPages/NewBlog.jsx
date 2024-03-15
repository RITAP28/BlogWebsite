import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import ContentSpace from "./ContentSpace";
import { IoMdCloseCircle } from "react-icons/io";

const NewBlog = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [draftConfirm, setDraftConfirm] = useState(false);
  const [draft, setDraft] = useState(false);
  const [showProfileDropdown, setShowProfileDropDown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const parsedData = JSON.parse(currentUser.config.data);
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
                <Avatar
                  className="h-full w-full object-cover"
                  img={parsedData.profilePicture}
                />
              </div>
            </div>
            <div className="basis-2/3">
              <div className="w-full text-black font-Kanit flex justify-start pl-4 item-center">
                {parsedData.username}
              </div>
              <div className="w-full font-Kanit">
                @
                {parsedData.email
                  .toLowerCase()
                  .split(" ")
                  .join("")
                  .slice(0, 15)}
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
                navigate('/profile')
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
              <button className="bg-green-400 px-2 py-1 rounded-xl text-teal-950 font-bold hover:cursor-pointer">
                Publish
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
          <ContentSpace setDraft={setDraft}  />
        </div>
      </div>
    </>
  );
};

export default NewBlog;
