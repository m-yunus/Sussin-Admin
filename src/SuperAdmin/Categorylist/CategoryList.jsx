// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../App';
import { LuDelete } from 'react-icons/lu';
import "./CategoryList.css"
import {BiEditAlt} from "react-icons/bi"
import Successpopup from '../../Admin/Components/Success_Popup/Successpopup';
import ErrorPopup from '../../Admin/Components/Error_Popup/ErrorPopup';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showerrorpopup,seterrorpopup]=useState(false);
  const [successdata,setsuccessData]=useState("")
  const [errordata,seterrordata]=useState("");
 const [categorycurrent,setcategorycurrent]=useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    fetchCategories()
  };
  // Function to fetch all categories
  const fetchCategories = async () => {
    const headers = {
        "x-access-token": sessionStorage.getItem("superadmin-token"),
      };
    try {
      const response = await axios.get(`${BaseUrl}/api/product/get-all-categories`,{headers});
     console.log(response.data);
      setCategories(response.data)
    
    } catch (error) {
      console.error("Error fetching categories", error);
      
    }
  };


  const deleteCategory = async (categoryId) => {
    const headers = {
        "x-access-token": sessionStorage.getItem("superadmin-token"),
      };
    try {
      await axios.delete(`${BaseUrl}/api/product/delete-category/${categoryId}`,{headers});
      // After successful deletion, fetch the updated list of categories
      setShowSuccessPopup(true)
      
      setsuccessData("delete Successfull")
       setTimeout(() => {
         setShowSuccessPopup(false); 
        
       }, 1000);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
      seterrorpopup(true)
      seterrordata(error.response.data.message)
      setTimeout(() => {
        seterrorpopup(false); 
      }, 2000);
    }
  };

  // Function to add a new category
  const addCategory = async () => {
    const headers = {
        "x-access-token": sessionStorage.getItem("superadmin-token"),
      };
    try {
      const data = { name: newCategoryName };
      await axios.post(`${BaseUrl}/api/product/add-category`, data,{headers});
      // After successful addition, fetch the updated list of categories
      setShowSuccessPopup(true)
      
      setsuccessData("Category added ")
       setTimeout(() => {
         setShowSuccessPopup(false); 
        
       }, 1000);
      fetchCategories();
     
      // Clear the input field
      setNewCategoryName('');
    } catch (error) {
      console.error("Error adding category", error);
      seterrorpopup(true)
      seterrordata(error.response.data.message)
      setTimeout(() => {
        seterrorpopup(false); 
      }, 2000);
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);
const handleEdit=(category)=>{
  setIsOpen(false);
setcategorycurrent(category)
  toggleModal()

}
  return (
    <>
    <div className='category-list'>
      <div className="p-8 flex flex-col ">
        <label htmlFor="category" className="text-lg font-semibold">
          Category name
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="category"
            className="ctgry-lst-input border w-1/4 my-4 font-normal  border-blue text-sm p-2 "
            placeholder="Enter category name"
            onChange={(e) => setNewCategoryName(e.target.value)}
            value={newCategoryName}
          />
          <button
            className="bg-green-500 p-2 cursor-pointer ms-4 hover:bg-green-800 font-bold h-8.5 text-sm w-20 text-white rounded"
            onClick={addCategory}
          >
            Create
          </button>
        </div>
      </div>
      <div className="px-8">
        <h2 className='text-lg font-semibold'>Categories:</h2>
        <table className="categories w-1/2 text-base font-semibold my-4">
          {categories.map((category) => (
            <tr className="border border-gray-400 w-100 flex items-center">
              <td key={category._id} className=" p-2 w-3/4  text-sm font-normal">
                {category.name}
              </td>
              <td className="flex gap-4 items-center ">
                <LuDelete
                  onClick={() => deleteCategory(category?._id)}
                  className="hover:text-red-500 cursor-pointer w-4"
                />
                <BiEditAlt className="hover:text-red-500 cursor-pointer w-4" onClick={()=>handleEdit(category)}/>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
    <CategoryList  isOpen={isModalOpen}
        onClose={toggleModal} category={categorycurrent} />
    {showSuccessPopup && <Successpopup data={successdata}/>}
      {showerrorpopup && <ErrorPopup data={errordata}/>}
    </>
  );
};

export default CategoryList;
