import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiOutlineHome } from "react-icons/hi";

import { TbTruckDelivery } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { CiUser } from "react-icons/ci";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState("100vh");
  const sideMenus = [
    { name: "Dashboard", link: "/dashboard", icon: HiOutlineHome },
    { name: "Categories", link: "/dashboard/categories", icon: BiCategoryAlt },
    { name: "Products", link: "/dashboard/products", icon: TbTruckDelivery },
    { name: "Users", link: "/dashboard/users", icon: LuUsers },
    { name: "Vendor Profile", link: "/dashboard/vendorprofile", icon: CiUser },
    { name: "Order", link: "/dashboard/order", icon: GiNotebook },
  ];


    useEffect(() => {
      const updateSidebarHeight = () => {
        const windowHeight = window.innerHeight;
        setSidebarHeight(`${windowHeight}px`);
      };

      updateSidebarHeight();
      window.addEventListener("resize", updateSidebarHeight);

      return () => {
        window.removeEventListener("resize", updateSidebarHeight);
      };
    }, []);
  
  return (
    <>
      <div
        className={`bg-blue-400   ${
          open ? "w-72" : "w-16"
        } duration-500 text-white px-4`}
        style={{ height: sidebarHeight }}
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
    </>
  );
};

export default Sidebar;
