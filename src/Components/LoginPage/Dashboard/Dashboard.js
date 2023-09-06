import React, { useState } from "react";
import { HiMenuAlt3, HiUser } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from  "../../../assets/images/Logo 1.png"
const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const sideMenus = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Products", link: "/Products", icon: TbTruckDelivery },
    { name: "Users", link: "/Users", icon: LuUsers },
    { name: "Order", link: "/Orders", icon: GiNotebook },
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Products", link: "/Products", icon: TbTruckDelivery },
    { name: "Users", link: "/Users", icon: LuUsers },
    { name: "Order", link: "/Orders", icon: GiNotebook },
  ];
  const [DropDownOpen, setDropDown] = useState(false);

  const toggleDropdown = () => {
    setDropDown(!DropDownOpen);
  };
  return (
    <section className="flex ">
    <div
      className={`bg-indigo-900 min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {sideMenus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
    <div className="text-xl text-gray-900 font-semibold w-full h-screen flex ">
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
        <HiUser size={20}/>
          <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">Admin</span>
          <svg
            className={`hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600 transition-transform ${
              DropDownOpen ? 'transform rotate-180' : ''
            }`}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {DropDownOpen && (
          <div className="hs-dropdown-menu absolute left-0 w-28 mt-2 py-2 bg-white dark:bg-gray-800 shadow-md rounded-lg" aria-labelledby="hs-dropdown-custom-trigger">
           
            <a
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Purchases
            </a>
            <a
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
             Home
            </a>
            <a
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              href="#"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </section>

    
</div>
      </div>
    </div>
  </section>
);
};
export default Dashboard;
