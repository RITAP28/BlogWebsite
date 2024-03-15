import React from "react";
import { IoMdMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import {Dropdown ,Avatar} from 'flowbite-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Navbar = ({setSidebar}) => {
  const navigate = useNavigate();
  return (
    <div className="relative h-full w-full flex justify-between text-white bg-teal-950">
      <div className="main-navbar flex justify-center items-center ml-4">
        <IoMdMenu
          className="text-3xl text-green-500 hover:cursor-pointer"
          onClick={() => setSidebar(true)}
        />
      </div>
      <div className="Logo flex justify-center items-center text-3xl text-green-400 font-Kanit font-bold">
        <div className="">
          <h1 className="hover:cursor-pointer">RitapBlogs</h1>
        </div>
        <div 
          className="pr-8 pl-6" 
        >
          <RxAvatar 
            className="text-3xl text-green-500 hover:cursor-pointer"
            onClick={() => {
              navigate('/profile');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;