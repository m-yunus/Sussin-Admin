import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";
import { RiMoreFill } from "react-icons/ri";
import ProductEditModal from "./ProductEditModal";
import { Link } from "react-router-dom";

const Productdetails = () => {
  const [productData, setproductData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    productTable();
  };
const [productCurrentdetail,setproductcurrentdetail]=useState(null)

  const productTable = async () => {
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
      const res = await axios.get(`${BaseUrl}/api/product/get-all`, {
        headers,
      });
      setproductData(res.data);
      console.log("successfully got product data", res);
    } catch (error) {
      console.log("error getting data", error);
    }
  };

  useEffect(() => {
    productTable();
  }, []); 
const handleDeleteProduct= async(productid)=>{
    const headers = {
        "x-access-token": sessionStorage.getItem("vendor-token"),
      };
      try {
      const res=  await axios.delete(`${BaseUrl}/api/product/delete/${productid}`,{headers})
      console.log("deleted succesfully",res);
      productTable()
      } catch (error) {
        console.log("error in delete",error);
      }
console.log(productid);
}
const handleEditProduct=(product)=>{
  setIsOpen(false);
  setproductcurrentdetail(product)
  toggleModal()

}
console.log(productCurrentdetail);
  return (
    <>
      <div className="p-5">
        <table className="user-table">
          <thead>
            <tr className="text-center">
              <th>SI no</th>
              <th>Image</th>
              <th>product name</th>
              <th>slug</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {productData.map((product, i) => (
              <tr className="text-center  text-sm" key={product._id}>
                <td>{i + 1}</td>
                {Object.keys(product.images).map((imageKey, index) => (
                  <td key={index} className="border-none flex justify-center items-center">
                    <img
                      src={`${BaseUrl}/${product.images[imageKey]}`}
                      alt=""
                      className="w-8 h-8 object-cover"
                      style={{ borderRadius: "50%" }}
                    />
                  </td>
                ))}
                <td>{product?.name}</td>
                <td>{product?.slug}</td>
                <td>{product?.description}</td>
                <td>
                  <div className="relative flex justify-center">
                  <button
                      className="flex items-center space-x-1"
                      onClick={() => setOpenDropdownIndex(i === openDropdownIndex ? null : i)}
                    >
                      <RiMoreFill className="text-gray-500" />
                    </button>
                    {openDropdownIndex === i && (
                      <div className="absolute top-3 right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md z-10">
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleEditProduct(product);
                          }}
                        >
                          Edit
                        </div>
                        <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            handleDeleteProduct(product?._id);
                          }}
                        >
                          Delete
                        </div>
                        <Link to="/productvariations"> <div
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                       
                        >
                         Variations
                        </div></Link>
                       
                      </div>
                     
                      

                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={toggleModal}
    productcurrent={productCurrentdetail}
      />
    </>
  );
};

export default Productdetails;
