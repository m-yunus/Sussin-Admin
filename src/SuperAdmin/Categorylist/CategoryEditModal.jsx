import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../App';
import Successpopup from '../../Admin/Components/Success_Popup/Successpopup';
import ErrorPopup from '../../Admin/Components/Error_Popup/ErrorPopup';

const CategoryEditModal = ({ isOpen, onClose, category }) => {
  const [name,setname]=useState(category.name);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showerrorpopup,seterrorpopup]=useState(false);
  const [successdata,setsuccessData]=useState("")
  const [errordata,seterrordata]=useState("");
  const handleUpdate=async()=>{
    const headers = {
      "x-access-token": sessionStorage.getItem("superadmin-token"),
    };
try {
  const res=await axios.patch(`${BaseUrl}/api/product/update-category/${category?._id}`,{name:name},{headers})
  console.log(res.data);
  setShowSuccessPopup(true)
      
  setsuccessData("delete Successfull")
   setTimeout(() => {
     setShowSuccessPopup(false); 
    onClose()
   }, 1000);

} catch (error) {
  seterrorpopup(true)
      seterrordata(error.response.data.message)
      setTimeout(() => {
        seterrorpopup(false); 
      }, 2000);
  console.log(error);
}
  }
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
    <div className=" update-product-popup bg-white w-2/6 p-6 rounded-lg shadow-md relative z-10 ">
      <h2 className="text-lg font-semibold mb-4">Category product</h2>

      <div className="mb-4">
        <div className="  items-center w-full gap-8">
          <div className="w-full">
            <label htmlFor="name" className="block text-gray-600 text-sm">
            Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setname(e.target.value)}
            
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 text-sm"
            />
          </div>
        
        </div>
      </div>
     
      
      <div className="flex justify-end gap-4 mt-2 ">
        <button
          className="bg-blue-600 text-white px-4 py-2 h-10 w-20 rounded text-sm  hover:bg-blue-700 "
          onClick={() => {
            // Handle user creation logic here

            // Close the modal
            onClose();
          }}
        >
          Close
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 h-10 w-20 rounded text-sm  hover:bg-blue-700"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
  </div>
  {showSuccessPopup && <Successpopup data={successdata}/>}
  {showerrorpopup && <ErrorPopup data={errordata}/>}
</>
  )
}

export default CategoryEditModal