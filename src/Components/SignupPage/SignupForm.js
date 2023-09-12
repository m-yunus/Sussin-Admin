import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../../App";

const SignupForm = () => {
 
 
  return (
    <>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl xl:text-bold">
          Create Account
        </h2>
        <div className="mt-12">
          <form >
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Full Name
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="text"
                placeholder="Enter Your Full Name"
                name="name"
                
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Email Address
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="Enter Your Email"
                name="email"
              
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"></a>
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                name="password"
                
              />
            </div>
            <div className="mt-10">
              <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                Signup
              </button>
            </div>
          </form>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Already have an account ?{" "}
            <a className="cursor-pointer text-indigo-600 hover:text-indigo-800">
              Login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
