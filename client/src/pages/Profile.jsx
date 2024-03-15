import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { Avatar } from "flowbite-react";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  const [sidebar, setSidebar] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const parsedData = JSON.parse(currentUser.config.data);
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
            <p className="text-6xl ml-4">{parsedData.username}</p>
          </div>
        </div>
        <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden -mt-16">
            {parsedData.profilePicture ? (
                <Avatar className="w-full h-full object-cover" img={parsedData.profilePicture} />
            ) : (
                <RxAvatar className="w-full h-full" />
            )}
            {/* <RxAvatar className="w-full h-full" /> */}
        </div>
        <div className="w-full">
            <div className="flex font-Kanit">
                <div className="basis-1/3 flex justify-center ">
                    <div className="flex flex-col">
                        <p className="flex justify-center text-2xl">10</p>
                        <p className="flex justify-center text-lg -mt-2">posts</p>
                    </div>
                </div>
                <div className="basis-1/3 flex justify-center ">
                    <div className="flex flex-col">
                        <p className="flex justify-center text-2xl">100</p>
                        <p className="flex justify-center text-lg -mt-2">Followers</p>
                    </div>
                </div>
                <div className="basis-1/3 flex justify-center ">
                    <div className="flex flex-col">
                        <p className="flex justify-center text-2xl">200</p>
                        <p className="flex justify-center text-lg -mt-2">Following</p>
                    </div>
                </div>
            </div>
            {/* Maximum 3 posts appear in the profile */}
            <div className="font-Kanit p-2 mt-4 text-xl">
                Your Recent Draft
            </div>
            <div className="font-Kanit p-2 text-xl">
                Your Posts
            </div>
            <div className="font-Kanit p-2 text-xl">
                About Yourself
            </div>
            <div className="font-Kanit p-2 text-xl">
                Subscriptions
            </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
