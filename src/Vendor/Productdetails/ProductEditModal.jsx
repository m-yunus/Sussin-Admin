import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";
import "./ProductEditModal.css"

const ProductEditModal = ({ isOpen, onClose, productcurrent }) => {
  const [productFields, setProductFields] = useState({
    name: "",
    description: "",
    slug: "",
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [showimage, setShowimage] = useState(false);
  useEffect(() => {
    if (productcurrent) {
      setProductFields({
        name: productcurrent.name || "",
        description: productcurrent.description || "",
        slug: productcurrent.slug || "",
      });

      // Populate the existing images
      const existingImages = Object.values(productcurrent.images || {});
      setUploadedImages(existingImages);
      setImages(existingImages);
      setShowimage(true);
    }
  }, [productcurrent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductFields({
      ...productFields,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    setShowimage(!showimage);
    const selectedImages = Array.from(event.target.files);

    // Update the state with the uploaded images, replacing the existing ones
    setUploadedImages(selectedImages);
    setImages(selectedImages);
  };
  const handleUpdate = async () => {
    const id = productcurrent._id;

    const formData = new FormData();

    formData.append("name", productFields?.name);
    formData.append("description", productFields?.description);
    formData.append("slug", productFields?.slug);
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    console.log(images);
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
      const res = await axios.patch(
        `${BaseUrl}/api/product/update/${id}`,
        formData,
        { headers }
      );
      console.log("updated succesfully", res.data);
      if (res) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          <h2 className="text-lg font-semibold mb-4">Update product</h2>

          <div className="mb-4">
            <div className="  items-center w-full gap-8">
              <div className="w-full">
                <label htmlFor="name" className="block text-gray-600 text-sm">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productFields?.name}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>
              <div className="w-full my-2">
                <label htmlFor="slug" className="block text-gray-600 text-sm">
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={productFields.slug}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center w-full gap-8">
            <div className="w-full">
              <label htmlFor="name" className="block text-gray-600 text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={productFields.description}
                onChange={(e) => handleInputChange(e)}
                id="description"
                className="p-4 text-sm w-full border-gray-400 border border-solid h-20 "
                cols="60"
                rows="5"
              ></textarea>
            </div>
          </div>
          <div className="w-full   ">
            <div className=" justify-center mx-auto   flex flex-wrap gap-4 p-4 items-center">
              {images.map((imageUrl, index) => (
                <div
                  className="w-24 h-24 border border-gray-400 flex items-center justify-center"
                  key={index}
                >
                  {showimage ? (
                    <img src={`${BaseUrl}/${imageUrl}`} alt="" />
                  ) : (
                    <img src={URL.createObjectURL(images[index])} alt="" />
                  )}
                </div>
              ))}
            </div>
            <div>
              <div className="flex h-8 justify-center b">
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
                  className="pointer text-xs flex items-center text-white bg-green-600 p-2 justify-center hover:bg-green-700 rounded-md"
                >
                  Upload File
                </label>
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
    </>
  );
};

export default ProductEditModal;
