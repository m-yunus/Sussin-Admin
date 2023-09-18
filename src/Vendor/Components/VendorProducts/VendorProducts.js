import React, { useEffect, useState } from "react";
import "./vendorProduct.css";
import axios from "axios";
import { BaseUrl } from "../../../App";
import Variations from "./Variations";
import { useNavigate, useParams } from "react-router-dom";
const VendorProducts = () => {
  const [images, setImages] = useState([]);
  const [productdata,setProductdata]=useState({
    name:"",
    description:"",
    categoryId:"",
   slug:""
  })
  const[category,setcategory]=useState([])
  const navigate = useNavigate();
  // Function to handle image selection
  const { productId } = useParams();
  
  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    console.log(selectedImages);

    setImages(selectedImages);
    console.log(images);
  };
  const handleInputchange=(e)=>{
      const {name,value}= e.target;
    setProductdata((prevdata)=>({...prevdata,[name]:value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
   console.log(productdata,images);
 
    const formData = new FormData()
    formData.append('name', productdata.name )
    formData.append('description', productdata.description );
    formData.append('categoryId',"6501529642d5caa305878fe5");
    formData.append('slug', productdata.slug );
    for(var i =0;i<images.length;i++){

      formData.append('images', images[i]);
    }

    console.log(formData,"form data")

  console.log(formData);
    try {
      const res=await axios.post(`${BaseUrl}/api/product/create`,formData,{headers});
      console.log('sumbmitted succesfully',res);


     
    
        const productid = res.data.product._id;
  
    console.log(productId);
        navigate(`/vendorDashboard/${productid}`);

    } catch (error) {
      console.log("API",error);
    }
  }
  const fetchcategory=async()=>{
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
    const res=  await axios.get(`${BaseUrl}/api/product/get-all-categories`,{headers})
    console.log(res.data,"categpries");
    setcategory(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
fetchcategory()
  },[category])
  return (
    <>
      <div className="create-product">
        <div>
          <form onSubmit={handleSubmit} >
        <div className="create-top-section flex justify-between ">
         
          <div className="flex flex-col  ">
            <h1>Product slug</h1>
            <span className="flex gap-2 my-2 items-center">
              <p>products/</p>{" "}
              <input
                className="w-54 h-10"
                placeholder="accented_khaki_pants "
                type="text"
                name="slug"
                value={productdata.slug}
                onChange={(e)=>handleInputchange(e)}
              />
            </span>
          </div>
          <div className="flex  flex-col ">
            <h1>Product Name</h1>
            <span className="flex  my-2 items-center">
              <input
                className="w-80 h-10 "
                placeholder="Accented Khaki Pants "
                type="text"
                name="name"
                value={productdata.name}
                onChange={(e)=>handleInputchange(e)}
              />
            </span>
          </div>
          <div className="flex flex-col ">
            <h1>Product Category</h1>
            <span className="flex  my-2 items-center">
              <select className="w-80 h-10" name="categoryId" value={productdata.categoryId} id="" onChange={(e)=>handleInputchange(e)}>
                {category.map((items,i)=>(<>
    <option value={items._id} key={i}>{items?.name}</option>
   
    </>
                ))}
            
              </select>
            </span>
          </div>
        </div>

        <div className="mt-2 flex justify-between">
          <div className=" w-[243px]">
            <h1>Product images</h1>
            <div className="w-full h-56 border border-gray-400 my-2 ">
              <div className="w-full h-48 border border-gray-400 flex flex-wrap gap-4 p-4 items-center overflow-scroll">
                {images.map((imagesmap, index) => (
                  <div
                    className="w-14 h-14 border border-gray-400 flex items-center justify-center"
                    key={index}
                  >
                    <img src={URL.createObjectURL(imagesmap)} alt={index} />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex h-8 justify-between">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    multiple
                    style={{ display: "none" }}
                    id="imageInput"
                    onChange={(e) => handleImageUpload(e)} // Handle image selection
                  />
                  <label
                    htmlFor="imageInput"
                    style={{ cursor: "pointer" }}
                    className="pointer text-xs flex items-center "
                  >
                    Upload File
                  </label>

                  <button className="browse-btn">Browse images</button>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button className="prvw-btn text-base">Preview</button>
              <button type="submit" className="create-btn text-base" >Create Product</button>
            </div>
          </div>
          <div className=" ">
            <h1>Product Description</h1>
            <input
              className="border border-gray-400 h-[305px] w-[680px]"
              type="text"
              name="description"
              value={productdata.description}
              onChange={(e)=>handleInputchange(e)}
            />
          </div>
          
        </div>
        </form>
        </div>

       {/* <Variations/> */}
      </div>
    </>
  );
};

export default VendorProducts;
