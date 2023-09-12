import React from "react";
import './UserCreationModal.css'

const UserCreationModal = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 flex  items-center justify-center ${
          isOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        }`}
      >
        {/* Backdrop overlay */}
        <div className="fixed inset-0 bg-black opacity-50"></div>

        {/* Modal content */}
        <div className="user-main bg-white w-1/2 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-lg font-semibold mb-4">Create User</h2>

          <div className="user mb-4">
            <div className=" flex items-center w-full gap-8">
              <div className="w-3/4">
                <label htmlFor="name" className="name-title block text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-name w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                />
              </div>
              <div className=" role-se flex-sh justify-center w-1/4">
                <label htmlFor="Role" className="role-title block text-gray-600">
                  Role
                </label>
                <select
                  name=""
                  id=""
                  className="vendor-user w-auto py-2 cursor-pointer px-3 border-gray-300 border rounded focus:outline-none focus:border-blue-400"
                >
                  <option
                    value=""
                    className="w-full px-3 border-gray-300 cursor-pointer rounded focus:outline-none focus:border-blue-400"
                  >
                    Vendor
                  </option>
                  <option value="" className="cursor-pointer">
                    User
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="Phone" className="phone-title block text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="email-title block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="pas-title block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="cls-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Handle user creation logic here

                // Close the modal
                onClose();
              }}
            >
              Close
            </button>
            <button
              className="crt-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Handle user creation logic here

                // Close the modal
                onClose();
              }}
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
