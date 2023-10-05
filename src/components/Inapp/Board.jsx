import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { overview_total } from "../../../default-api";

export const Board = () => {
  return (
    <div className="w-[95%] mx-auto my-5">
      <Routes>
        <Route
          path="overview"
          element={<Overview />}
        />
        <Route
          path="products"
          element={<Products />}
        />
        <Route
          path="blogs"
          element={<Blogs />}
        />
        <Route
          path="appointments"
          element={<Appointments />}
        />
        <Route
          path="reviews"
          element={<Reviews />}
        />
        <Route
          path="settings"
          element={<Settings />}
        />
      </Routes>
    </div>
  );
};

export const Overview = () => {
  return (
    <div>
      <h1 className="board-header">Overview</h1>
      <div className="flex flex-row justify-between">
        {overview_total.map((each, i) => (
          <div
            key={i}
            className="bg-grey bg-opacity-10 w-[200px] h-[100px] px-5 py-3 rounded"
          >
            <h4 className="text-grey font-bodyFamily">{each._for}</h4>
            <h2 className="flex items-center justify-center h-full text-f25 text-blue">
              {each._total}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Products = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    // discount: 4,
    category: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductDetails({ ...productDetails, [name]: value });
  };
  return (
    <div>
      <h1 className="board-header"> Products</h1>
      <div className="adding-product">
        <div className="flex items-end justify-end">
          <button className=" bg-green-700 text-[#fff] w-[150px] h-[40px] rounded-md ">
            Add Product
          </button>
        </div>
        <div className="product-det">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Upload image</label>
            <i className="pi pi-image text-[100px] text-neutral-300" />
          </div>
          <div className="text-details">
            {Object.keys(productDetails).map((fieldName, i) => (
              <div key={i}>
                {fieldName !== "category" ? (
                  <input
                    name={fieldName}
                    type="text"
                    value={productDetails[fieldName]}
                    placeholder={`Product ${
                      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                    }`}
                    onChange={handleChange}
                    className="border outline-none mb-4 h-[30px] w-[250px]  px-3 rounded-md"
                  />
                ) : (
                  <select
                    name={fieldName}
                    value={productDetails[fieldName]}
                    onChange={handleChange}
                    className="border w-[250px] h-[30px] px-3 rounded-md"
                  >
                    <option
                      value=""
                      disabled
                      selected
                    >
                      Select categorty
                    </option>
                    <option value="computer">Computer</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="accsessories">Accessories</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Blogs = () => {
  return (
    <div>
      <h1 className="board-header"> Blogs</h1>
    </div>
  );
};

export const Appointments = () => {
  return (
    <div>
      <h1 className="board-header"> Appointments</h1>
    </div>
  );
};

export const Reviews = () => {
  return (
    <div>
      <h1 className="board-header"> Reviews</h1>
    </div>
  );
};

export const Settings = () => {
  return (
    <div>
      <h1 className="board-header">Settings </h1>
    </div>
  );
};
