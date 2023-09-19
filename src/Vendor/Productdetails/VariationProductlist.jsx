import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../App'
import { useParams } from 'react-router-dom'
import { RiMoreFill } from 'react-icons/ri'
import VariationEditModal from './VariationEditModal'
import "./VariationProductlist.css"

const VariationProductlist = () => {
  const {variationProductid}=useParams();
  const [gettedVariation,setgettedVariation]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedvariation,setSelectedVariation]=useState(null)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  
  };
  const fetchVariation=async()=>{
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
      const res = await axios.get(`${BaseUrl}/api/product/get-product-with-variation/${variationProductid}`,{headers})
      console.log("product variations",res.data);
      setgettedVariation(res.data)
    } catch (error) {
      console.log("Apierror",error);
    }

  }
  useEffect(()=>{
    fetchVariation()
  },[])
  const handleDeleteVariation=async(variation)=>{
    const {_id,productId}=variation
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
      const res=await axios.delete(`${BaseUrl}/api/product/delete-variation/${productId}/${_id}`,{headers})

      console.log("deleted succesfully",res);
      if(res){
        fetchVariation()
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handlemodalopen=(variations)=>{
    setIsModalOpen(true)
    setOpenDropdownIndex(null)
    
    setSelectedVariation(variations)
   
  }


  return (
    <>
      <div className="p-5 ">
        <div className='pb-20' style={{ overflowX: "auto" }}>
          <table className="user-table min-w-full ">
            <thead>
              <tr className="w-full font-medium variation-heading">
                <td className="  w-18 ">Sl no</td>
                <td className=" w-24">Price</td>
                <td className=" w-18">Size</td>
                <td className=" w-18">Color</td>
                <td className=" w-20">Images</td>
                <td className=" w-18">Stock</td>
                <td className=" w-34">Offer price</td>
                <td className=" w-34">Offer Start date</td>
                <td className=" w-34">Offer end date</td>
                <td className=" w-18">Weight</td>
                <td className=" w-18">Wargin</td>
                <td className=" w-20">Actions</td>
              </tr>
            </thead>

            <tbody>
              {gettedVariation.map((variation, i) => (
                <tr className="  text-sm" key={i}>
                  <td>{i + 1}</td>
                  <td>{variation?.price}</td>
                  <td>{variation?.size}</td>
                  <td>{variation?.color}</td>
                  {Object.keys(variation.images).map((imageKey, index) => (
                    <td
                      key={index}
                      className="border-none flex justify-center items-center"
                    >
                      <img
                        src={`${BaseUrl}/${variation.images[imageKey]}`}
                        alt=""
                        className="w-8 h-8 object-cover"
                        style={{ borderRadius: "50%" }}
                      />
                    </td>
                  ))}
                  <td>{variation?.stock}</td>
                  <td className="akshay">{variation?.offer_price}</td>
                  <td>{variation?.offer_start_date?.split("T")[0]}</td>
                  <td>{variation?.offer_end_date?.split("T")[0]}</td>
                  <td>{variation?.weight}</td>
                  <td>{variation?.margin}</td>
                  <td>
                    <div className="relative flex justify-center">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() =>
                          setOpenDropdownIndex(
                            i === openDropdownIndex ? null : i
                          )
                        }
                      >
                        <RiMoreFill className="text-blue-500" />
                      </button>
                      {openDropdownIndex === i && (
                        <div className="absolute top-3 right-0 mt-2 w-32 bg-white border border-gray-400 rounded shadow-md z-10">
                          <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlemodalopen(variation)}
                          >
                            Edit
                          </div>
                          <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDeleteVariation(variation)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <VariationEditModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        selectedvariation={selectedvariation}
        fetchVariation={fetchVariation}
      />
    </>
  );
}

export default VariationProductlist