// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../App';
import { LuDelete } from 'react-icons/lu';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

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
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
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
      fetchCategories();
      // Clear the input field
      setNewCategoryName('');
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  return (
    <div>
      <div className='p-8 flex flex-col'>
        <label htmlFor="category" className='text-lg'>Category name</label>
        <input
          type="text"
          id='category'
          className='border w-1/2 m-4 border-blue text-sm p-2'
          placeholder='Enter category name'
          onChange={(e) => setNewCategoryName(e.target.value)}
          value={newCategoryName}
        />
        <button
          className='bg-green-400 p-2 cursor-pointer hover:bg-green-700 hover:text-white rounded'
          onClick={addCategory}
        >
          Create
        </button>
      </div>
      <div>
        <h2>Categories:</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id} className='flex gap-4 items-center '>
              {category.name}
             
               <LuDelete onClick={()=>deleteCategory(category?._id)} className='hover:text-red-500 cursor-pointer'/>
            
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryList;
