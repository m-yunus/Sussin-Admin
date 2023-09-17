import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../App";
import axios from "axios";

const VariationEditModal = ({ isOpen, onClose, selectedvariation,fetchVariation }) => {
  const [formData, setFormData] = useState({
    price: "",
    stock: "",
    size: "",
    color: "",
    weight: "",
    dimensionX: "",
    dimensionY: 0,
    dimensionZ: 0,
    offer_price: 0,
    offer_start_date: "",
    offer_end_date: "",
    margin: 0,
  });
  const [images, setImages] = useState([]);
  const [showimage, setShowimage] = useState(false);

  // Update form data when selectedvariation changes
  useEffect(() => {
    if (selectedvariation) {
      setFormData({
        price: selectedvariation.price || "",
        stock: selectedvariation.stock || "",
        size: selectedvariation.size || "",
        color: selectedvariation.color || "",
        weight: selectedvariation.weight || "",
        dimensionX: selectedvariation.dimension?.x || "",
        dimensionY: selectedvariation.dimension?.y || 0,
        dimensionZ: selectedvariation.dimension?.z || 0,
        offer_price: selectedvariation.offer_price || 0,
        offer_start_date: selectedvariation.offer_start_date || "",
        offer_end_date: selectedvariation.offer_end_date || "",
        margin: selectedvariation.margin || 0,
      });

      setImages([selectedvariation?.images]);
      setShowimage(true);
    }
  }, [selectedvariation]);
console.log(selectedvariation);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (event) => {
    setShowimage(!showimage);
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  };

  const handleUpdate = async () => {
    const data = new FormData();
  
    data.append("price", formData.price ? parseFloat(formData.price) : undefined);
    data.append("stock", formData.stock ? parseFloat(formData.stock) : undefined);
    data.append("size", formData.size || undefined);
    data.append("color", formData.color || undefined);
  
    for (var i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
  
    data.append("variationId", selectedvariation?._id || undefined);
    data.append("weight", formData.weight ? parseFloat(formData.weight) : undefined);
    data.append("dimensionX", formData.dimensionX !==0 ? parseFloat(formData.dimensionX) : undefined);
    data.append("dimensionY", formData.dimensionY !==0? parseFloat(formData.dimensionY) : undefined);
    data.append("dimensionZ", formData.dimensionZ !==0 ? parseFloat(formData.dimensionZ) : undefined);
    data.append("offer_price", formData.offer_price ? parseFloat(formData.offer_price) : undefined);
    data.append("offer_start_date", formData.offer_start_date || undefined);
    data.append("offer_end_date", formData.offer_end_date || undefined);
    data.append("margin", formData.margin !==0 ? parseFloat(formData.margin) : undefined);
  
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
  
    console.log(selectedvariation?._id);
    try {
      const res = await axios.patch(`${BaseUrl}/api/product/update-variation`, data, { headers })
      console.log("updated successfully", res.data);
      fetchVariation()
      onclose()
    } catch (error) {
      console.log(error);
    }
  };
  

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
        <div className="bg-white w-4/5 p-6 rounded-lg shadow-md relative z-10">
          <h2 className="text-lg font-semibold mb-4">Update Variation</h2>

          <div className="w-full flex flex-wrap">
            <div className="px-4 py-1  flex flex-wrap w-full gap-12">
              <div className="flex flex-col">
                <label htmlFor="weight" className="text-sm font-semibold">
                  Product Weight
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-28 border rounded p-1"
                    id="weight"
                    name="weight"
                    value={formData?.weight}
                    onChange={handleInputChange}
                  />
                  <select
                    className="border rounded p-1 ml-2"
                    id="weightUnit"
                    name="weightUnit"
                    value={formData?.weightUnit}
                    onChange={handleInputChange}
                  >
                    <option value="kg">KiloGram</option>
                    <option value="g">Gram</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dimensionX" className="text-sm font-semibold">
                  Length
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20 border rounded p-1"
                    id="dimensionX"
                    name="dimensionX"
                    value={formData?.dimensionX}
                    onChange={handleInputChange}
                  />
                  <select name="" id="">
                    <option value="">Meter</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dimensionY" className="text-sm font-semibold">
                  Height
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20"
                    name="dimensionY"
                    value={formData?.dimensionY}
                    onChange={handleInputChange}
                  />
                  <select name="" id="">
                    <option value="">Meter</option>
                    <option value="">Centimeter</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="dimensionZ" className="text-sm font-semibold">
                  Breadth
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20"
                    name="dimensionZ"
                    value={formData?.dimensionZ}
                    onChange={handleInputChange}
                  />
                  <select name="" id="">
                    <option value="">Meter</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-semibold">
                  Product Price
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-28 border rounded p-1"
                    id="price"
                    name="price"
                    value={formData?.price}
                    onChange={handleInputChange}
                  />
                  <select
                    className="border rounded p-1 ml-2"
                    id="priceUnit"
                    name="priceUnit"
                    value={formData?.priceUnit}
                    onChange={handleInputChange}
                  >
                    <option value="$">$</option>
                    {/* Add other currency options here */}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="color" className="text-sm font-semibold">
                  Color
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="text"
                    className="w-20"
                    name="color"
                    value={formData?.color}
                    onChange={handleInputChange}
                  />
                  <select className="w-[65px]" name="" id="">
                    <option value="">Pick</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="size" className="text-sm font-semibold">
                  Size
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="text"
                    className="w-20"
                    name="size"
                    value={formData?.size}
                    onChange={handleInputChange}
                  />
                  <select className="w-[65px]" name="" id="">
                    <option className="unni" value="">
                      Num
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="stock" className="text-sm font-semibold">
                  Stock
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20"
                    name="stock"
                    value={formData?.stock}
                    onChange={handleInputChange}
                  />
                  <select className="w-[65px]" name="" id="">
                    <option value="">Nos</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="offer_price" className="text-sm font-semibold">
                  Offer Price
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20"
                    name="offer_price"
                    value={formData?.offer_price}
                    onChange={handleInputChange}
                  />
                  <select className="w-[65px]" name="" id="">
                    <option value="">Nos</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="offer_start_date"
                  className="text-sm font-semibold"
                >
                  Offer Start Date
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="date"
                    className="w-28 border rounded p-1"
                    name="offer_start_date"
                    value={formData?.offer_start_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="offer_end_date"
                  className="text-sm font-semibold"
                >
                  Offer End Date
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="date"
                    className="w-40"
                    name="offer_end_date"
                    value={formData?.offer_end_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="margin" className="text-sm font-semibold">
                  Margin
                </label>
                <div className="flex mt-1 h-10">
                  <input
                    type="number"
                    className="w-20"
                    name="margin"
                    value={formData?.margin}
                    onChange={handleInputChange}
                  />
                  <select className="w-[65px]" name="" id="">
                    <option value="">Nos</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border border-gray-400 h-20 flex gap-10 items-center">
            {images?.map((imageUrl, index) => (
              <div
                className="w-14 h-14 border border-gray-400 flex items-center justify-center"
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
          <div className="flex h-8">
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              multiple
              style={{ display: "none" }}
              id="imageInput"
              onChange={(e) => handleImageUpload(e)}
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

          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                // Close the modal without saving changes
                onClose();
              }}
            >
              Close
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

export default VariationEditModal;
