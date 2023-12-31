import React, { useEffect, useState } from "react";
import UserCreationModal from "../../Layout/Sidebar/UserCreationModal/UserCreationModal";
import "./Users.css";
import axios from "axios";
import { BaseUrl } from "../../../App";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import Successpopup from "../Success_Popup/Successpopup";
import ErrorPopup from "../Error_Popup/ErrorPopup";


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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showerrorpopup,seterrorpopup]=useState(false);
  const [successdata,setsuccessData]=useState("")
  const [errordata,seterrordata]=useState("");
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
        setShowSuccessPopup(true)
      
      setsuccessData("Updated Successfull")
       setTimeout(() => {
         setShowSuccessPopup(false); 
         fetchData();
         setEditedUser(null);
         setIsModalOpen(false);
       }, 2000);
        // Update the user in the state or refetch the updated user list
        // Example: refetchData();
       
      }
      
    } catch (error) {
      seterrorpopup(true)
      seterrordata(error.response.data.message)
      setTimeout(() => {
        seterrorpopup(false); 
      }, 2000);
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
      setShowSuccessPopup(true)
      
      setsuccessData("Deleted Successfull")
       setTimeout(() => {
         setShowSuccessPopup(false); 
         
       }, 2000);
      console.log("user deleted succesfully", response.data);
    } catch (error) {
      seterrorpopup(true)
      seterrordata(error.response.data.message)
      setTimeout(() => {
        seterrorpopup(false); 
      },2000);
      console.log("Api error", error);
    }
  };

  return (
    <>
      <div className=" h-full w-full users">
        <div className="users-top flex items-center justify-between  h-20   px-4  ">
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
            className="add-user bg-blue-500 text-white text-sm hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
        <div className="p-5 table-container">
          <table className="user-table  ">
            <thead>
              <tr className="headings  ">
                <th className="">
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </th>
                <th className="user-name font-semibold">User Name</th>
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
       {showSuccessPopup && <Successpopup data={successdata}/>}
      {showerrorpopup && <ErrorPopup data={errordata}/>}
    </>
  );
};

export default Users;


