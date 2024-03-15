import React from "react";
import { useNavigate } from "react-router-dom";

const AuthCheckLog = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-teal-950 h-screen">
        <div className="flex justify-center items-center relative h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] pb-[6rem]">
            <div className="w-full font-Kanit font-bold text-green-400 text-5xl">
              <div className="flex justify-center items-center">Uh oh!</div>
            </div>
            <div className="w-full font-Kanit text-sm font-extrabold text-green-400 my-2">
              <div className="flex justify-center items-center">
                Seems like you aren't logged in.
              </div>
            </div>
            <div className=" flex justify-center items-center mt-4">
              <button
                className="px-4 py-2 bg-green-400 text-teal-950 rounded-md hover:cursor-pointer font-Kanit font-bold text-2xl"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCheckLog;
