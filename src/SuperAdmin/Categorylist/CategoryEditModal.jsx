import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseUrl } from '../../App';
import Successpopup from '../../Admin/Components/Success_Popup/Successpopup';
import ErrorPopup from '../../Admin/Components/Error_Popup/ErrorPopup';

const CategoryEditModal = ({ isOpen, onClose, category }) => {
  const [name, setName] = useState(category ? category.name : '');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [successData, setSuccessData] = useState('');
  const [errorData, setErrorData] = useState('');

  const handleUpdate = async () => {
    const headers = {
      "x-access-token": sessionStorage.getItem("superadmin-token"),
    };

    try {
      const res = await axios.patch(`${BaseUrl}/api/product/update-category/${category._id}`, { name:name }, { headers });
      console.log(res.data);
      setShowSuccessPopup(true);
      setSuccessData("Update Successful");
      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
      }, 1000);
    } catch (error) {
      setShowErrorPopup(true);
      setErrorData(error.response.data.message);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 2000);
      console.error(error);
    }
  };

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

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
        <div className="update-product-popup bg-white w-2/6 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-lg font-semibold mb-4">Category product</h2>

          <div className="mb-4">
            <div className="items-center w-full gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-600 text-sm">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 h-10 w-20 rounded text-sm hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 h-10 w-20 rounded text-sm hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {showSuccessPopup && <Successpopup data={successData} />}
      {showErrorPopup && <ErrorPopup data={errorData} />}
    </>
  );
};

export default CategoryEditModal;
