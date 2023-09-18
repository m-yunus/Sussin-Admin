import React, { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { TiFolder } from 'react-icons/ti'; // Corrected the import for the TiFolder icon
import { Link } from 'react-router-dom';

const Superadminsidebar = () => {
  const [open, setOpen] = useState(true);
  const sideMenus = [
    { name: "Categories", link: "/dashboard/categories", icon: <TiFolder /> }, // Use the TiFolder component directly
  ];

  return (
    <div className={`bg-indigo-900 min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
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
            className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
          >
            <div>{menu?.icon}</div> {/* Use the icon component directly */}
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
  );
};

export default Superadminsidebar;
