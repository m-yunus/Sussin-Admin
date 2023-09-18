import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../../App';

const Updateprofile = ({isOpen,onClose}) => {
   const [formdata,setFormData]=useState({
    business_name:"",
    brand_description:""
   })
   const [selectedFile, setSelectedFile] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevdata)=>({ ...prevdata, [name]: value }));
      };
      const handleUpdate=async()=>{
    //    e.preventDefault();
       const data={
        business_name : formdata?.business_name ,
        brand_description  : formdata?.brand_description
       }
       const headers = {
        "x-access-token": sessionStorage.getItem("vendor-token"),
      };
       try {
        const res=await axios.patch(`${BaseUrl}/api/vendor/update`,data,{headers})
        console.log("updated succefully",res);
        if(res){
            onClose()
        }
       } catch (error) {
        console.log("apierror",error);
       }
      
      }
  

  const handleFileChange = (event) => {
   
    const file = event.target.files[0];
    
      setSelectedFile(file);
  
  };

  const handleSave = async () => {
   
    if (selectedFile) {
      const formData = new FormData();
      formData.append('logo', selectedFile);

      const headers = {
        "x-access-token": sessionStorage.getItem("vendor-token"),
      };

      try {
        const response = await axios.patch(`${BaseUrl}/api/vendor/update-logo`, formData, { headers });
        console.log('Logo updated successfully', response.data);
setSelectedFile(null)
       
      } catch (error) {
        console.error('Error updating logo', error);
        setSelectedFile(null)
      }
    } else {
      alert('Please select a valid PNG or JPEG image before saving.');
      
    }
  };

  return (
    <>
      <div className="w-full">
        <div
          className={`fixed w-4/6 mx-auto inset-0 flex items-center justify-center ${
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
                <div className="w-full">
                  <label htmlFor="name" className="block text-sm text-gray-600">
                    Business name
                  </label>
                  <input
                    type="text"
                    id="business_name"
                    name="business_name"
                    value={formdata.business_name}
                    onChange={handleInputChange}
                    className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 text-sm">
                Brand Description
              </label>
              <input
                type="text"
                id="brand_description"
                name="brand_description"
                value={formdata.brand_description}
                onChange={handleInputChange}
                className="w-full text-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
              />
            </div>{" "}
            <div className="mb-4">
              <label htmlFor="logo" className="block text-gray-600 text-sm">
                Brand logo
              </label>

              <div className="flex justify-between ">
                <input
                  className="text-sm "
                  type="file"
                  id="logo"
                  accept=".png, .jpeg, .jpg" // Specify accepted file types
                  onChange={handleFileChange}
                />
                <button
                  className="bg-green-500 text-white p-2 rounded text-sm h-8 w-20  flex items-center justify-center hover:bg-green-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-20 h-8 hover:bg-blue-800"
                onClick={() => {
                  // Handle user creation logic here

                  // Close the modal
                  onClose();
                }}
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-20 h-8 hover:bg-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Updateprofile