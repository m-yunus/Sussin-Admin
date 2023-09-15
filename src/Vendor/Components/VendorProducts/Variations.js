import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductVariations() {
  const {productid} =useParams()
  console.log(productid);
  // Define state to store the variations, with an initial variation
  const [variations, setVariations] = useState({
    'Variation #1': {
      productWeight: '',
      height: '',
      width: '',
      breadth: '',
      price: '',
      color: '',
      size: '',
      stock: '',
    },
    // Add more variations as needed
  });

  // State to track the currently selected variation
  const [selectedVariation, setSelectedVariation] = useState('Variation #1');

  // Function to create a new variation object
  const createVariation = () => {
    const variationKey = `Variation #${Object.keys(variations).length + 1}`;
    return {
      productWeight: '',
      height: '',
      width: '',
      breadth: '',
      price: '',
      color: '',
      size: '',
      stock: '',
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

  return (
    <>
      <div className="mt-16">
        <h1>Product Variations</h1>
        <div className="w-full border border-gray-400 flex">
          <div className="flex flex-col">
            {Object.keys(variations).map((key, index) => (
              <div
                key={index}
                className={`w-40 h-10 border border-gray-400 flex items-center ps-2 ${
                  key === selectedVariation ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleVariationSelect(key)}
              >
                {key}
              </div>
            ))}
            <div className="w-40 h-28 border border-gray-400 flex items-center ps-2">
              <button onClick={addVariation}>Create new +</button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="px-4 py-1 product-bottom flex gap-12">
              {/* Conditionally render fields based on selected variation */}
              {selectedVariation && (
                <>
                  <div className="flex flex-col">
                    <h1>Product Weight</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-28"
                        value={variations[selectedVariation].productWeight}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].productWeight =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select name="" id="">
                        <option value="">Gram</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1>Height</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-20"
                        value={variations[selectedVariation].height}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].height =
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
                    <h1>Width</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-20"
                        value={variations[selectedVariation].width}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].width =
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
                    <h1>Breadth</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
                        className="w-20"
                        value={variations[selectedVariation].breadth}
                        onChange={(e) => {
                          const updatedVariations = { ...variations };
                          updatedVariations[selectedVariation].breadth =
                            e.target.value;
                          setVariations(updatedVariations);
                        }}
                      />
                      <select name="" id="">
                        <option value="">Meter</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="px-4 py-2 product-bottom flex gap-12">
              {/* Conditionally render fields based on selected variation */}
              {selectedVariation && (
                <>
                  <div className="flex flex-col">
                    <h1>Product Price</h1>
                    <div className="flex mt-1 h-10">
                      <input
                        type="text"
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
                        type="text"
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
                </>
              )}
            </div>
            <div className="px-4 py-2">
              <h1>Variation images</h1>
              <div className="w-full border border-gray-400 h-20 flex gap-10 items-center">
                {Object.keys(variations).map((key, index) => (
                  <div key={index} className="w-14 h-14 border border-gray-400 flex items-center justify-center ms-5">
                    <img
                      className="akshay"
                      src="https://picsum.photos/200/200"
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <div className="flex h-8">
                <button className="upload-btn">Upload image</button>
                <button className="browse-btn">Browse images</button>
              </div>
              <button className="border border-gray-400 h-12 w-40 mt-5">
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
