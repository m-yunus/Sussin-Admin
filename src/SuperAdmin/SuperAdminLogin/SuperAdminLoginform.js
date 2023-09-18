import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SuperAdminLoginform = () => {
    const [login, setlogin] = useState({
        email: "",
        password: "",
      });
      const navigate = useNavigate();
      const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setlogin((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const loginData = {
          email: login.email,
          password: login.password,
        };
    
        try {
          const response = await axios.post(
            `https://suss.onrender.com/api/admin/login`,
            loginData
          );
          console.log(response);
    
          if (response.status === 200) {
            console.log("Registration Successful:", response.data);
            const token = response.data.token;
            sessionStorage.setItem("superadmin-token", token);
            navigate("/superadmin_dashboard");
          }
        } catch (error) {
          console.log("login failed", error);
        }
      };
    
      return (
        <>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl xl:text-bold">
             Super Admin Log In
            </h2>
            <div className="mt-12">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    onChange={handleInput}
                    value={login.email}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <div>
                      <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    onChange={handleInput}
                    value={login.password}
                  />
                </div>
                <div className="mt-10">
                  <button type="submit" className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg">
                    Log In
                  </button>
                </div>
              </form>
              
            </div>
          </div>
        </>
      );
    };

export default SuperAdminLoginform