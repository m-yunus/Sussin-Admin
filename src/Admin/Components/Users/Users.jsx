import React, { useEffect, useState } from "react";
import UserCreationModal from "../../Layout/Sidebar/UserCreationModal/UserCreationModal";
import "./Users.css";
import axios from "axios";
import { BaseUrl } from "../../../App";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gettedData, setGettedData] = useState([]);
  const [editedUser, setEditedUser] = useState(null); // Track the edited user
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "vendor",
  });
  //modal handling
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //   modal edit toggle
  const toggleEditModal = (user) => {
    setEditedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      userType: user.userType,
    });
    toggleModal();
  };

  //user data table
  const fetchData = async () => {
    const headers = {
      "x-access-token": sessionStorage.getItem("admin-token"),
    };
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/get-all-users`, {
        headers,
      });
      setGettedData(response.data);
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  //user update
  const handleEditSubmit = async () => {
    // Perform the user update logic here
    try {
      const headers = {
        "x-access-token": sessionStorage.getItem("admin-token"),
      };
      const updatedUser = {
        userId: editedUser._id,
        ...FormData,
      };
      const response = await axios.post(
        `${BaseUrl}/api/admin/update-user`,
        updatedUser,
        { headers }
      );
      console.log("User updated successfully", response);
      setFormData((prev) => ({
        ...prev,
        name: "",
        email: "",
        password: "",
        userType: "vendor",
      }));
      if (response.status === 200) {
        // Update the user in the state or refetch the updated user list
        // Example: refetchData();
        fetchData();
        setEditedUser(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gettedData]);
  console.log(gettedData, "sdffsd");

  //   delete a  user
  const handleDelete = async (userid) => {
    console.log(userid);
    const headers = {
      "x-access-token": sessionStorage.getItem("admin-token"),
    };
    try {
      const response = await axios.post(
        `${BaseUrl}/api/admin/delete-user`,
        {
          userId: userid,
        },
        { headers }
      );
      console.log("user deleted succesfully", response.data);
    } catch (error) {
      console.log("Api error", error);
    }
  };

  return (
    <>
      <div className=" h-full w-full ">
        <div className="users-top flex items-center justify-between  h-20   px-4  border border-gray-400">
          <form class="search-bar">
            <div class="search-icon">
              <CiSearch />
            </div>
            <input
              type="search"
              id="default-search"
              class="search-input"
              placeholder="Search for users..."
              required
            />
          </form>

          <button
            onClick={toggleModal}
            className="add-user bg-blue-500 text-white hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
        <div className="p-5 table-container">
          <table className="user-table  ">
            <thead>
              <tr className="headings ">
                <th className="">
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </th>
                <th className="user-name">User Name</th>
                <th className="email">Email</th>
                <th className="date">Create Date</th>
                <th className="status">Account Status</th>
                <th className="action">Action</th>
              </tr>
            </thead>

            <tbody>
              {gettedData.map((users) => (
                <tr>
                  <td>
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      name=""
                      id=""
                    />
                  </td>
                  <td className="flex gap-3">
                    <img
                      src="https://picsum.photos/200"
                      alt=""
                      className="profile-picture"
                    />
                    <h1>{users.name}</h1>
                  </td>
                  <td>{users.email}</td>
                  <td>{users.createdAt}</td>

                  <td>
                    {users.isVeified === true ? (
                      <div className=" active">Active</div>
                    ) : (
                      <div className=" inactive">Inactive</div>
                    )}
                  </td>
                  <td className="flex gap-4">
                    <span
                      className="edit-icon cursor-pointer"
                      onClick={() => toggleEditModal(users)}
                    >
                      <AiFillEdit />
                    </span>

                    <span
                      onClick={() => handleDelete(users._id)}
                      className="delete-icon cursor-pointer"
                    >
                      <AiFillDelete />
                    </span>
                  </td>
                </tr>
              ))}
              {/* You can add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      <UserCreationModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        editsubmit={handleEditSubmit}
        FormData={FormData}
        setFormData={setFormData}
        editedUser={editedUser}
      />
    </>
  );
};

export default Users;
