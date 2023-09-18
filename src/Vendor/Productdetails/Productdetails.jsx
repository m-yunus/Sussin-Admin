import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";
import { RiMoreFill } from "react-icons/ri";
import ProductEditModal from "./ProductEditModal";
import { Link, useNavigate } from "react-router-dom";

const Productdetails = () => {
  const [productData, setproductData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const navigate=useNavigate();
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
      const res = await axios.get(`${BaseUrl}/api/product/get-products-of-vendor`, {
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
const NavigateVariation=(variationProductid,slug)=>{
  navigate(`/vendorDashboard/${variationProductid}/${slug}`);
}
console.log(productCurrentdetail);
  return (
    <>
    <h1 className="px-5 pt-5">Product List</h1>
      <div className="flex w-full">
       
        {/* <div className="m-5 border p-2 border-gray-400 w-[20%] text-sm">
          <p className="pb-2">Filters</p>
          <hr className="bg-gray-400 w-full"/>
          <p className="py-2 text-gray-500">Products</p>
          <ul>
            <li>
              Grocery
            </li>
            <li>Fashion</li>
            <li>Watches</li>
            <li>Electronics</li>
            <li>Furniture</li>
            <li>Automotive Accessories</li>
            <li>Appliances</li>
            <li>Kids</li>
          </ul>

        </div> */}
        <div className="p-5 table-container  w-full">
          <button className="bg-green-500 text-sm text-white w-34 px-4  h-10 rounded-lg mb-4">
            + Add Product
          </button>

          <table className="user-table h-auto ">
            <thead>
              <tr className="w-full">
                <th className="">sl no</th>
                <th className="">Image</th>
                <th className="user-name">Product name</th>
                <th className="email">Slug</th>
                <th className="status">Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {productData.map((product, i) => (
                <tr className="  text-sm" key={product._id}>
                  <td>{i + 1}</td>
                  {Object.keys(product.images).map((imageKey, index) => (
                    <td key={index} className="border-none flex  items-center">
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
                    <div className="relative flex ">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() =>
                          setOpenDropdownIndex(
                            i === openDropdownIndex ? null : i
                          )
                        }
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
                          <div
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              NavigateVariation(product?._id, product?.slug)
                            }
                          >
                            Variations
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
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        productcurrent={productCurrentdetail}
      />
    </>
  );
};

export default Productdetails;
