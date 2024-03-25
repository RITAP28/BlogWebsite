import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useDispatch } from "react-redux";
import { SignUpSuccess } from "../redux/Slices/userSlice";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try{
      setErrorMessage(null);
      const res = await axios
      .post("http://localhost:3000/user/register", {
        username: data.username.trim(),
        email: data.email,
        password: data.password,
      })
      .then(() => {
        if(!data.username || !data.email || !data.password){
          return setErrorMessage('Please fill out all fields');
        };
        dispatch(SignUpSuccess());
        console.log('You should go to Onboarding page');
        navigate("/getting-started/onboarding");
        console.log(data);
      });
    } catch(err){
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <div className="w-full h-screen bg-teal-950 font-mono">
      <div className="flex justify-center items-center">
        <h1 className="pt-[11rem] pb-4 font-Kanit font-bold text-5xl text-green-400">
          RitapBlogs
        </h1>
      </div>

      <div className="w-full max-w-xs p-4 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-teal-950 shadow-md rounded px-8 pt-6 pb-8 mb-4 font-Kanit"
        >
          <div className="mb-4">
            <label className="block text-green-400 text-sm font-bold mb-2">
              Username
            </label>
            <input
              {...register("username")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
            {errors.username && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-green-500 text-sm font-bold mb-2">
              Email
            </label>
            <input
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email Address"
            />
            {errors.email && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-green-400 text-sm font-bold mb-2">
              Password
            </label>
            <input
              {...register("password")}
              className="shadow rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>
          <div className="left-1/2 translate-x-[25%]">
            <button
              className="bg-green-400 hover:bg-green-500 text-teal-950 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>
          </div>
          <div className="w-full hover:cursor-pointer mt-4 flex justify-center items-center">
            <OAuth />
        </div>
          {/* <OAuth /> */}
          {errorMessage && (
            window.alert(errorMessage)
          )};
        </form>
        <p className="text-center text-green-400 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
