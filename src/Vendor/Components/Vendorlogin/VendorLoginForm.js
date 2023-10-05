import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../../../App";
import { useNavigate } from "react-router-dom";
import Successpopup from "../../../Admin/Components/Success_Popup/Successpopup";
import ErrorPopup from "../../../Admin/Components/Error_Popup/ErrorPopup";

const VendorLoginForm = () => {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showerrorpopup,seterrorpopup]=useState(false);
  const [successdata,setsuccessData]=useState("")
  const [errordata,seterrordata]=useState("");
const navigate=useNavigate();
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setlogin((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const loginData = {
        email: login.email,
        password: login.password,
      };
        try {
            const res=await axios.post(`${BaseUrl}/api/vendor/login`,loginData)
            console.log(res);
            if (res.status === 200) {
                console.log("login Successful:", res.data);
                const token = res.data.token;
                sessionStorage.setItem("vendor-token", token);
               
                setShowSuccessPopup(true)
      
                setsuccessData("Login Successfull")
                 setTimeout(() => {
                   setShowSuccessPopup(false); 
                   navigate("/vendorDashboard");
                 }, 1000);
              }
        } catch (error) {
            console.log("API error",error);
            seterrorpopup(true)
            seterrordata("Invalid credentials Login failed")
            setTimeout(() => {
              seterrorpopup(false); 
            }, 2000);
        }
        console.log(loginData);
  }

  return (
    <>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl xl:text-bold">
          Vendor Log in
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
                value={login.email}
                onChange={handleInput}
              />
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center">
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <div>
                  {/* <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                    Forgot Password?
                  </a> */}
                </div>
              </div>
              <input
                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={login.password}
                onChange={handleInput}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccessPopup && <Successpopup data={successdata}/>}
      {showerrorpopup && <ErrorPopup data={errordata}/>}
    </>
  );
};

export default VendorLoginForm;