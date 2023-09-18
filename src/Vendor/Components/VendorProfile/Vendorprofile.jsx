import React, { useEffect, useState } from "react";
import "./Vendorprofile.css"
import axios from "axios";
import { BaseUrl } from "../../../App";
import Updateprofile from "./Updateprofile";

const VendorDashprofile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gettedData, setGettedData] = useState({});
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const fetchData = async () => {
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
      const res = await axios.get(`${BaseUrl}/api/vendor/profile`, { headers });
      setGettedData(res.data);
      console.log(res);
    } catch (error) {
      console.log("Api", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [gettedData]);

  return (
    <>
      <div className=" min-h-screen w-full p-6">
        <h1 className="demo">MY ACCOUNT</h1>

        <div className="my-profile w-full h-auto border my-4 p-4 border-gray-300 flex  rounded-md  ">
          <img
            className="h-72 w-50 rounded-lg"
            src="https://picsum.photos/200/300"
            alt=""
          />
          <div className="px-4 flex flex-col font-normal text-sm gap-2">
            <h5>Bussiness name :{gettedData?.vendor?.business_name}</h5>
            <h5>Brand Description :{gettedData?.vendor?.brand_description}</h5>
          </div>
        </div>

        <div className="w-full h-24 flex p-4 ">
          <button
            onClick={toggleModal}
            className="bg-green-500 flex items-center justify-center text-white px-2 text-sm h-8 w-32 text-center py-2 rounded hover:bg-green-700"
          >
            Update Profile
          </button>
        </div>
      </div>
      <Updateprofile isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default VendorDashprofile;
