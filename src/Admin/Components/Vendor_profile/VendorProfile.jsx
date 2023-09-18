import React, { useEffect, useState } from 'react'
import "../Users/Users.css"

import axios from 'axios';
import { BaseUrl } from "../../../App";
const VendorProfile = () => {
const [vendorData,setvendorData]=useState([])
const VendorTable=async()=>{
  const headers = {
    "x-access-token": sessionStorage.getItem("admin-token"),
  };
  try {
    const res=await axios.get(`${BaseUrl}/api/admin/get-all-vendors`,{headers})
  setvendorData(res.data);
  console.log("succefully getted vendor data",res);
  } catch (error) {
    console.log("error getting data",error);
  }
  
}

useEffect(()=>{
VendorTable()
},[vendorData])


  return (
    <>
      <div className="p-5 table-container">
        <table className="user-table">
          <thead>
            <tr className="headings">
              <th className="">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  name=""
                  id=""
                />
              </th>
              <th className="user-name w-80 ">Name</th>
              <th className="email">Email</th>
              <th className="date">Create Date</th>
              <th className="status">Account Status</th>
            </tr>
          </thead>

          <tbody>
            {vendorData.map((vendor) => (
              <tr className=" text-sm" key={vendor?._id}>
                <td>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </td>
                <td className="flex gap-3">
                  {" "}
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="profile-picture"
                  />
                  <h1> {vendor?.name}</h1>
                </td>
                <td>{vendor?.email}</td>
                <td>{vendor?.createdAt}</td>
                <td>
                  {vendor.isVerified === true ? (
                    <div className=" active">Active</div>
                  ) : (
                    <div className=" inactive">Inactive</div>
                  )}{" "}
                </td>
              </tr>
            ))}

            {/* You can add more rows as needed */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default VendorProfile