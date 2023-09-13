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
   <div className="p-5">
          <table className="user-table">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
             {vendorData.map((vendor)=>(
                <tr className="text-center  text-sm" key={vendor?._id}>
                <td>{vendor?.name}</td>
                <td>{vendor?.email}</td>
                <td>{vendor?.userType}</td>
                
                 
                 
                   
               
               
              </tr>
             ))}
              
     
              {/* You can add more rows as needed */}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default VendorProfile