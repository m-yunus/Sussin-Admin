import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { BaseUrl } from '../../../App';
import Updateprofile from './Updateprofile';



const VendorDashprofile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gettedData,setGettedData]=useState({})
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
      const fetchData=async()=>{

const headers = {
    "x-access-token": sessionStorage.getItem("vendor-token"),
  };
try {
    const res=await axios.get(`${BaseUrl}/api/vendor/profile`,{headers})
setGettedData(res.data)
console.log(res);
} catch (error) {
    console.log("Api",error);
}
      }
      useEffect(()=>{
        fetchData()
      },[gettedData])
      
  return (
    <>
    <div className="bg-gray-100 min-h-screen w-full ">
        <div className="w-full h-24 flex p-4">
          <button
            onClick={toggleModal}
            className="bg-blue-500 text-white px-2 text-sm h-8 w-32 text-center py-2 rounded hover:bg-blue-600"
          >
            update profile
          </button>
        </div>

        <div className='p-3 flex flex-col'>
           <h5>Bussiness name :{gettedData?.vendor?.business_name}</h5> 
          <h5>Brand Description :{gettedData?.vendor?.brand_description}</h5>  
        </div>
        </div>
       <Updateprofile  isOpen={isModalOpen}
        onClose={toggleModal}/>
    </>
  )
}

export default VendorDashprofile