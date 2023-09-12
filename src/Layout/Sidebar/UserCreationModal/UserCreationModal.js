import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../../../App";

const UserCreationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "vendor", // Default role value
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit=async(e)=>{
    console.log(formData);
    e.preventDefault();
    const headers = {
      "x-access-token": sessionStorage.getItem("admin-token"),
    };
    console.log(headers);
    try {
      const res=await axios.post(`${BaseUrl}/api/admin/add-user`,formData,{headers});
      console.log("user created succesfully",res);
      if(res){
        onClose()
      }
    } catch (error) {
      console.log("API Error",error);
    }
  }
  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
      >
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal content */}
        <div className="bg-white w-1/2 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-lg font-semibold mb-4">Create User</h2>
          
          <div className="mb-4">
            <div className=" flex items-center w-full gap-8">
              <div className="w-3/4">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className="justify-center w-1/4">
                <label htmlFor="Role" className="block text-gray-600">
                  Role
                </label>
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full py-2 cursor-pointer px-3 border-gray-300 border rounded focus:outline-none focus:border-blue-400"
                >
                  <option
                    value="vendor"
                    className="w-full px-3 border-gray-300 cursor-pointer rounded focus:outline-none focus:border-blue-400"
                  >
                    Vendor
                  </option>
                  <option value="user" className="cursor-pointer">
                    User
                  </option>
                </select>
              </div>
            </div>
          </div>
        
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Handle user creation logic here

                // Close the modal
                onClose();
              }}
            >
              Close
            </button>
            <button onClick={(e)=>handleSubmit(e)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
           
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreationModal;
