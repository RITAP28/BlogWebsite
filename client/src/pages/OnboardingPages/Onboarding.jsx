import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UserOnboarded,
  Onboarding1Completed,
  Onboarding2Completed,
  Onboarding1Skipped,
  Onboarding2Skipped,
} from "../../redux/Slices/userSlice";

function Onboarding() {
  const [currentPage, setCurrentPage] = useState(1);
  const [titleOne, setTitleOne] = useState();
  const [titleTwo, setTitleTwo] = useState();
  const [titleThree, setTitleThree] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  function handleSubmitOne() {
    console.log("titleone", titleOne);
    dispatch(Onboarding1Completed(titleOne));
    nextPage();
  };

  function handleSubmitTwo() {
    console.log("titletwo", titleTwo);
    dispatch(Onboarding2Completed(titleTwo));
    nextPage();
  };

  const handleSubmitThree = () => {
    console.log("titlethree", titleThree);
    dispatch(UserOnboarded(titleThree));
    window.alert("Congratulations, you have been onboarded!");
    navigate("/login");
  };
  
  return (
    <>
      {/* Onboarding Page 1 */}
      <div className="w-full h-screen bg-teal-950 flex flex-col">
        <div className="basis-2/5 flex flex-col justify-end">
          <div className="pb-[5rem]">
            <div className="flex justify-center font-Kanit text-3xl font-bold underline text-green-400">
              RitapBlogs
            </div>
            <div className="flex justify-center font-Kanit text-4xl font-bold text-white">
              Onboarding/Page/{currentPage}
            </div>
          </div>
        </div>
        <div className="basis-3/5">
          {/* the lower half */}
          {currentPage === 1 && (
            <>
              <div className="flex justify-center pb-4">
                <label className="font-Kanit text-green-400 text-lg">
                  What is your current profession or occupation?
                </label>
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  className="w-[15rem] h-[2rem] rounded-md font-Kanit pl-2"
                  placeholder="Occupation/Profession"
                  onChange={(e) => {
                    e.preventDefault();
                    setTitleOne(e.target.value);
                  }}
                />
              </div>
              <div className="basis-1/4 flex justify-evenly pt-10">
                <div className="">
                  <button
                    className="px-10 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={() => {
                      dispatch(Onboarding1Skipped());
                      nextPage();
                    }}
                  >
                    Skip
                  </button>
                </div>
                <div className="">
                  <button
                    className="px-10 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={handleSubmitOne}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {currentPage === 2 && (
            <>
              <div className="flex justify-center pb-4">
                <label className="font-Kanit text-green-400 text-lg w-[79%]">
                  Could you share a brief overview of your expertise or
                  professional background?
                </label>
              </div>
              <div className="flex justify-center">
                <textarea
                  type="text"
                  className="w-[18rem] rounded-md font-Kanit pl-2"
                  placeholder="Write here..."
                  onChange={(e) => {
                    e.preventDefault();
                    setTitleTwo(e.target.value);
                  }}
                />
              </div>
              <div className="basis-1/4 flex justify-evenly pt-10">
                <div className="">
                  <button
                    className="px-10 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={() => {
                      dispatch(Onboarding2Skipped());
                      nextPage();
                    }}
                  >
                    Skip
                  </button>
                </div>
                <div className="">
                  <button
                    className="px-10 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={handleSubmitTwo}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {currentPage === 3 && (
            <>
              <div className="flex justify-center pb-4">
                <label className="font-Kanit text-green-400 text-lg w-[84%]">
                  Are there any specific topics or areas within your profession
                  that you're particularly interested in or passionate about?
                </label>
              </div>
              <div className="flex justify-center">
                <textarea
                  type="text"
                  className="w-[20rem] rounded-md font-Kanit pl-2"
                  required
                  placeholder="Write here..."
                  onChange={(e) => {
                    e.preventDefault();
                    setTitleThree(e.target.value);
                  }}
                />
              </div>
              <div className="basis-1/4 flex justify-evenly pt-10">
                <div className="">
                  <button
                    className="px-4 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={() => {
                      window.alert("First sign-in to explore our plans");
                      navigate("/login");
                    }}
                  >
                    Explore Plans
                  </button>
                </div>
                <div className="">
                  <button
                    className="px-4 rounded-md font-Kanit text-xl text-white hover:cursor-pointer py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    onClick={handleSubmitThree}
                  >
                    Login to Continue
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Onboarding;
