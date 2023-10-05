import axios from "axios";
import React, { useState } from "react";
import { BaseUrl } from "../../../../App";

const UserCreationModal = ({ isOpen, onClose ,FormData,editsubmit ,setFormData ,editedUser }) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };
  const handleSubmit = async (e) => {
    console.log(FormData);
    e.preventDefault();
    const headers = {
      "x-access-token": sessionStorage.getItem("admin-token"),
    };
    console.log(headers);
    try {
      const res = await axios.post(`${BaseUrl}/api/admin/add-user`, FormData, {
        headers,
      });
      console.log("user created succesfully", res);

      if (res) {
        onClose();
        setFormData((prev)=>({...prev,name:"",email:"",password:"",userType:"vendor"}))
      }
    } catch (error) {
      console.log("API Error", error);
    }
  };

  return (
    <>
      <div
        className={`fixed  inset-0 flex items-center justify-center ${
          isOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
      >
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal content */}
        <div className="bg-white w-5/6 sm:w-2/6 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-lg font-semibold mb-4">Add User</h2>

          <div className="mb-4">
            <div className=" flex items-center w-full ">
              <div className="w-full">
                <label htmlFor="name" className="block text-sm text-gray-600">
                  User Name
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  id="name"
                  name="name"
                  value={FormData.name}
                  onChange={handleInputChange}
                  className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
          </div>
          <div className="justify-center mb-4 w-full">
            <label htmlFor="userType" className="block text-gray-600 text-sm">
              Role
            </label>
            <select
              name="userType"
              id="userType"
              value={FormData.userType}
              onChange={handleInputChange}
              className="w-full text-sm py-2 cursor-pointer px-3 border-gray-300 border rounded focus:outline-none focus:border-blue-400"
            >
              <option
                value="vendor"
                name="vendor"
                className="w-full text-sm px-3 border-gray-300 cursor-pointer rounded focus:outline-none focus:border-blue-400"
              >
                Vendor
              </option>
              <option value="user" name="user" className="cursor-pointer">
                User
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={FormData.email}
              onChange={handleInputChange}
              className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={FormData.password}
              onChange={handleInputChange}
              className="w-full px-3 text-sm py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="t text-red-500 p-2 text-base rounded  hover:bg-red-200"
              onClick={() => {
                // Handle user creation logic here

                // Close the modal
                onClose();
              }}
            >
              Close
            </button>
            <button
              onClick={editedUser ? editsubmit : handleSubmit}
              className="bg-green-500 text-white p-2 rounded text-base hover:bg-green-600"
            >
              {editedUser ? "Update" : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCreationModal;
