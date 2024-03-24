import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import {Dropdown ,Avatar} from 'flowbite-react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Navbar = ({setSidebar}) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { Google, Normal, currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  async function getUser(){
    try {
      const user = await axios.get(`http://localhost:3000/user/me`, { withCredentials: true });
      setLoggedUser(user.data.user);
    } catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    getUser();
    console.log(loggedUser);
  }, []);

  console.log(loggedUser);
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
          {currentUser ? (
            <RxAvatar 
            className="text-3xl text-green-500 hover:cursor-pointer"
            onClick={() => {
              if(Google){
                const parsedData = JSON.parse(currentUser.config.data);
                navigate(`/google/profile?user=${parsedData.username}&Id=${currentUser.data.user._id}`);
              }else if(Normal){
                navigate(`/profile?user=${loggedUser.username}&Id=${loggedUser._id}`);
              }
            }}
          />
          ) : (
            <RxAvatar 
            className="text-3xl text-green-500 hover:cursor-pointer"
            onClick={() => {
              if(Google){
                navigate(`/google/profile`);
              }else if(Normal){
                navigate('/profile');
              }
            }}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
