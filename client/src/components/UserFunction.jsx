import React from "react";
import { FaPen } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiSaveDown1 } from "react-icons/ci";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NewBlog from "../pages/BlogPages/NewBlog";
import AuthCheckLog from "./AuthCheckLog";
import { SignInSuccess } from "../redux/Slices/userSlice";

const UserFunction = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.user);
    const handleClick = () => {
        if(isAuthenticated){
            navigate('/new-story');
            console.log('Clicked');
        }else {
            navigate('/login');
        }
    }
    return (
        <>
        <div 
            className="mt-6"
        >
            <div className="flex flex-row">
                <div className="basis-3/4 flex flex-row">
                    <div className="basis-1/4 font-Kanit pl-4 hover:cursor-pointer">For you</div>
                    <div className="basis-1/4 font-Kanit pl-2 hover:cursor-pointer">Following</div>
                </div>
                <div className="basis-1/4 flex flex-row">
                    <div className="basis-1/3">
                        <FaPen 
                            className="text-xl hover:cursor-pointer"
                            onClick={handleClick}
                        />
                    </div>
                    <div className="basis-1/3">
                        <CiSearch className="text-xl hover:cursor-pointer" />
                    </div>
                    <div className="basis-1/3">
                        <CiSaveDown1 className="text-xl hover:cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
        <hr className="text-lg mt-2" />
        </>
    )
}

export default UserFunction;