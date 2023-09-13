import React, { useState } from "react";

import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/images/Logo 1.png";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import { HiUser } from "react-icons/hi";
const Dashboard = () => {
 
  const [DropDownOpen, setDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropDown(!DropDownOpen);
  };
  return (
    <section className="flex w-full ">
     <Sidebar/>
      <div className="text-xl text-gray-900 font-semibold w-full h-screen flex flex-col ">
        <div className="bg-gray-300 h-16 w-full p-2 flex justify-between items-center">
          <div className="w-24">
            <img src={logo} alt="logo" className="w-24  h-14 object-cover" />
          </div>
          <div>
            <section className="flex  ">
              <div className="hs-dropdown relative inline-block text-left">
                <button
                  id="hs-dropdown-custom-trigger"
                  type="button"
                  className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  onClick={toggleDropdown}
                >
                  <HiUser size={20} />
                  <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
                    Admin
                  </span>
                  <svg
                    className={`hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600 transition-transform ${
                      DropDownOpen ? "transform rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {DropDownOpen && (
                  <div
                    className="hs-dropdown-menu absolute left-0 w-24 mt-2 py-3 bg-white dark:bg-gray-800 shadow-md rounded-lg"
                    aria-labelledby="hs-dropdown-custom-trigger overflow-hidden"
                  >
                    <Link className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      Purchases
                    </Link>
                    <Link className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </section>
            
          </div>
        </div>
        <div className="bg-white h-full w-full">
                  <Outlet/>
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
