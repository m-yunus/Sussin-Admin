import React, { useEffect, useState } from "react";
import UserCreationModal from "../../Layout/Sidebar/UserCreationModal/UserCreationModal";
import "./Users.css";
import axios from "axios";
import { BaseUrl } from "../../../App";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

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
      <div className="bg-gray-100 h-full w-full ">
        <div className="w-full h-24 flex p-4">
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white px-2 text-sm h-8 w-32 text-center py-2 rounded hover:bg-blue-600"
          >
            Create User
          </button>
        </div>
        <div className="p-5">
          <table className="user-table">
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {gettedData.map((users) => (
                <tr className="text-center  text-sm" key={users._id}>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.userType}</td>
                  <td className="flex gap-4">
                    {" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => toggleEditModal(users)}
                    >
                      <AiFillEdit />
                    </span>{" "}
                    {""}{" "}
                    <span
                      onClick={() => handleDelete(users._id)}
                      className="text-red-600 cursor-pointer"
                    >
                      <AiFillDelete />{" "}
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
