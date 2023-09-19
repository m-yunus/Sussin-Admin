import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../../../App";
import "./Variation.css"

function ProductVariations() {
  const [weightunit, setweightunit] = useState("kg");
  const [images, setImages] = useState([]);
  const { productid } = useParams();

  const [selectedDate, setSelectedDate] = useState("");

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  // Define state to store the variations, with an initial variation
  const [variations, setVariations] = useState({
    "Variation #1": {
      weight: 0,
      dimensionX: 0,
      dimensionY: 0,
      dimensionZ: 0,
      offer_price: 0,
      price: 0,
      width: "",
      offer_start_date: "",
      offer_end_date: "",
      margin: 0,
      color: "",
      size: "",
      stock: 0,
    },
    // Add more variations as needed
  });

  // State to track the currently selected variation
  const [selectedVariation, setSelectedVariation] = useState("Variation #1");

  // Function to create a new variation object
  const createVariation = () => {
    const variationKey = `Variation #${Object.keys(variations).length + 1}`;
    const selectedVariationData = variations[selectedVariation];
    return {
      weight: selectedVariationData.weight,
      dimensionX: selectedVariationData.dimensionX,
      dimensionY: selectedVariationData.dimensionY,
      dimensionZ: selectedVariationData.dimensionZ,
      offer_price: selectedVariationData.offer_price,
      price: selectedVariationData.price,
      offer_start_date: selectedVariationData.offer_start_date,
      offer_end_date: selectedVariationData.offer_end_date,
      color: selectedVariationData.color,
      size: selectedVariationData.size,
      stock: selectedVariationData.stock,
      margin: selectedVariationData.margin,
    };
  };

  // Function to add a new variation to the object
  const addVariation = () => {
    const newVariation = createVariation();
    const variationKey = `Variation #${Object.keys(variations).length + 1}`;
    setVariations({ ...variations, [variationKey]: newVariation });
  };

  // Function to handle variation selection
  const handleVariationSelect = (variationKey) => {
    setSelectedVariation(variationKey);
  };
  const handleweightChange = (e) => {
    const updatedVariations = { ...variations };
    updatedVariations[selectedVariation].weight = e.target.value;
    setVariations(updatedVariations);
  };
  const handleWeightUnitChange = (e) => {
    const newUnit = e.target.value;
    setweightunit(newUnit);
    const updatedVariations = { ...variations };
    const currentWeight = updatedVariations[selectedVariation].weight;

    if (newUnit === "g") {
      // Convert to grams and format with three decimal places
      const gValue = (currentWeight / 1000).toFixed(3);

      setVariations((prevData) => ({
        ...prevData,
        [selectedVariation]: {
          ...prevData[selectedVariation],
          weight: parseFloat(gValue), // Ensure it's a number
        },
      }));
    } else if (newUnit === "kg") {
      // Convert to kilograms without decimal places
      const kgValue = Math.round(currentWeight / 1000);

      setVariations((prevData) => ({
        ...prevData,
        [selectedVariation]: {
          ...prevData[selectedVariation],
          weight: kgValue, // Whole number without decimal places
        },
      }));
    }
  };
  const handleImageUpload = (event) => {
    const selectedImages = Array.from(event.target.files);
    console.log(selectedImages);

    setImages(selectedImages);
    console.log(images);
  };
  const handlesubmitVariation = async () => {
    const selectedVariationObject = variations[selectedVariation];

    const formdata = new FormData();
    formdata.append("productId", productid);
    formdata.append("price", parseFloat(selectedVariationObject.price));
    formdata.append("stock", parseFloat(selectedVariationObject.stock));
    formdata.append("size", selectedVariationObject.size);
    formdata.append("color", selectedVariationObject.color);
    for (var i = 0; i < images.length; i++) {
      formdata.append("images", images[i]);
    }

    formdata.append("weight", parseFloat(selectedVariationObject.weight));
    formdata.append(
      "dimensionX",
      parseFloat(selectedVariationObject.dimensionX)
    );
    formdata.append(
      "dimensionY",
      parseFloat(selectedVariationObject.dimensionY)
    );
    formdata.append(
      "dimensionZ",
      parseFloat(selectedVariationObject.dimensionZ)
    );
    formdata.append(
      "offer_price",
      parseFloat(selectedVariationObject.offer_price)
    );
    formdata.append(
      "offer_start_date",
      selectedVariationObject.offer_start_date
    );
    formdata.append("offer_end_date", selectedVariationObject.offer_end_date);
    formdata.append("margin", parseFloat(selectedVariationObject.margin));
    const headers = {
      "x-access-token": sessionStorage.getItem("vendor-token"),
    };
    try {
    const res=await axios.post(`${BaseUrl}/api/product/add-variation`,formdata,{headers})
    console.log("variation added",res);
    } catch (error) {
   console.log("API eror",error);
    }
  };

  return (
    <>
      <div className=" p-5  w-full variation">
        <h1>Product Variations</h1>
        <div className="w-full border border-gray-400 flex ">
          <div className="variation-left flex flex-col  w-[170px] text-sm ">
            {Object.keys(variations).map((key, index) => (
              <div
                key={index}
                className={`variation-no w-40 h-10 border border-gray-400 flex items-center ps-2 ${
                  key === selectedVariation ? "bg-gray-200" : ""
                }`}
                onClick={() => handleVariationSelect(key)}
              >
                {key}
              </div>
            ))}
            <div className="create-button w-40 h-12 flex items-center ">
              <button
                className="w-full h-full bg-green-600 text-white hover:bg-green-800 text-lg
              "
                onClick={addVariation}
              >
                Create new +
              </button>
            </div>
          </div>
          <div className="flex flex-col   variation-right ">
            <div className="px-4 py-1  product-bottom flex ">
              {/* Conditionally render fields based on selected variation */}
              {selectedVariation && (
                <div className="flex gap-2  justify-between w-full text-sm flex-wrap ">
                  <div className="flex flex-col ">
                    <h1>Product Weight</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].weight}
                        onChange={(e) => handleweightChange(e)}
                      />
                      <select
                        name=""
                        id=""
                        value={weightunit}
                        onChange={(e) => handleWeightUnitChange(e)}
                      >
                        <option value="kg">KiloGram</option>
                        <option value="g">Gram</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>length</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].dimensionX}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].dimensionX =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select name="" id="">
                        <option value="">Meter</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Height</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].dimensionY}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].dimensionY =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select name="" id="">
                        <option value="">Meter</option>
                        <option value="">Centimete</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>breadth </h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].dimensionZ}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].dimensionZ =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select name="" id="">
                        <option value="">Meter</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-4 py-2 product-bottom flex justify-between text-sm flex-wrap ">
              {/* Conditionally render fields based on selected variation */}
              {selectedVariation && (
                <div className="flex justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <h1>Product Price</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-28"
                        value={variations[selectedVariation].price}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].price =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option value="">$</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Color</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-20"
                        value={variations[selectedVariation].color}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].color =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option value="">Pick</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Size</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-20"
                        value={variations[selectedVariation].size}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].size =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option className="unni" value="">
                          Num
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Stock</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].stock}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].stock =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option value="">Nos</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>offer price</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].offer_price}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].offer_price =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option value="">Nos</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>margin</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="number"
                        className="w-20"
                        value={variations[selectedVariation].margin}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].margin =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select className="w-[65px]" name="" id="">
                        <option value="">Nos</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Offer Start Date</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="date"
                        className="w-40"
                        value={variations[selectedVariation].offer_start_date}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[
                            selectedVariation
                          ].offer_start_date = e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Offer End Date</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="date"
                        className="w-40"
                        value={variations[selectedVariation].offer_end_date}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].offer_end_date =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="variation-btm px-4 py-2 ">
              <h1>Variation images</h1>
              <div className="variation-img w-full border border-gray-400 h-20 flex gap-10 items-center">
                {images.map((imagesmap, index) => (
                  <div
                    key={index}
                    className="w-14 h-14 border border-gray-400 flex items-center justify-center ms-5"
                  >
                    <img src={URL.createObjectURL(imagesmap)} alt={index} />
                  </div>
                ))}
              </div>
              <div className="file-inp-variation flex h-8">
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
                  className="pointer text-xs flex items-center justify-center bg-green-600 text-white hover:bg-green-800  "
                >
                  Upload File
                </label>
                <button className="ms-2 browse-btn bg-green-600 text-white hover:bg-green-800 ">
                  Browse images
                </button>
              </div>
              <button
                className="bg-blue-500 text-white text-sm hover:bg-blue-800 px-4 py-2 rounded-lg  mt-5"
                onClick={handlesubmitVariation}
              >
                Save Variation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductVariations;
