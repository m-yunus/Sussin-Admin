import axios from 'axios';
import React, { useState } from 'react'
import { BaseUrl } from '../../../App';

const Categories = () => {
  const [name,setname]=useState("");
  const handleClick=async()=>{
    const data=name
    const headers = {
      "x-access-token": sessionStorage.getItem("admin-token"),
    };
    console.log(data);
    try {
      const res=await axios.post(`${BaseUrl}/api/product/add-category`,data,{headers})
      console.log("category added",res)
    } catch (error) {
      console.log("API error",error);
    }
  }
  return (
    <>
      <div>
        <div className='p-8 flex flex-col'>
          <label htmlFor="category" className='text-lg'>Category name</label>
          <input type="text" id='category' className='border  w-1/2 m-4 border-blue text-sm p-2' placeholder='enter category name' onChange={(e)=>{setname(e.target.value)}} value={name} />
          <div className=''>
            <button className='bg-green-400 p-2 cursor-pointer hover:bg-green-700 hover:text-white rounded' onClick={handleClick}>Create</button>
          </div>
        </div>

      </div>
    </>
  
  )
}

export default Categories