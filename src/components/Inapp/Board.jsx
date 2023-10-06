import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { overview_total } from "../../../default-api";

import AddImage from "../../assets/add-image.png";

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
        >
          <Route
            path="add-new-product"
            element={<AddProduct />}
          />
        </Route>
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

export const Products = function () {
  const navigate = useNavigate();
  const [pathnameChange, setPathnameChange] = useState(true);

  const handleNavigate = function () {
    navigate("/admin-panel/products/add-new-product");
    setPathnameChange(false);
  };
  return (
    <div>
      <h1 className="board-header">Products</h1>
      <div className="">
        <div className="toggle-board">
          <button
            className={`${
              pathnameChange ? "hidden" : "block"
            } w-[150px] h-[30px] bg-grey bg-opacity-10 rounded`}
            onClick={handleNavigate}
          >
            Add New Product +
          </button>
          <Routes>
            <Route
              path="add-new-product"
              element={<AddProduct />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    // discount: 4,
    category: "",
    description: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductDetails({ ...productDetails, [name]: value });
    setFieldErrors({
      ...fieldErrors,
      [name]:
        value === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : "",
    });
  };

  const validateForm = function () {
    const newErrors = {};

    let isValid = true;

    Object.entries(productDetails).forEach(([fieldName, fieldValue]) => {
      if (fieldValue.trim() === "") {
        newErrors[fieldName] = `${
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
        } is required`;
        isValid = false;
      }
    });

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log(productDetails);
    } else {
      return;
    }
  };
  return (
    <div className="">
      <div className="adding-product">
        <div className="flex items-center justify-between">
          <h3 className="text-grey text-f16 font-bodyFamily">
            Add New Product
          </h3>
          <button
            type="submit"
            className=" bg-green-700 text-[#fff] w-[150px] h-[40px] rounded-md "
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
        {/* Details and Preview */}
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="product-infomation ">
            <div className="product-information-wrapper">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Image</label>
                <div className="border flex items-center justify-center rounded-md p-3 w-[80px] h-[80px]">
                  <img
                    src={AddImage}
                    alt=""
                    className="custom-image"
                  />
                </div>
              </div>
              <div className="text-details">
                <div className="mt-3">
                  <label className="text-f14">Product Informations</label>
                  <form className="mt-5">
                    {Object.keys(productDetails).map((fieldName, i) => (
                      <div key={i}>
                        {fieldName === "name" || fieldName === "price" ? (
                          <input
                            name={fieldName}
                            type="text"
                            value={productDetails[fieldName]}
                            placeholder={`Product ${
                              fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)
                            }`}
                            onChange={handleChange}
                          />
                        ) : fieldName == "description" ? (
                          <textarea
                            name={fieldName}
                            value={productDetails[fieldName]}
                            placeholder={`Product ${
                              fieldName.charAt(0).toUpperCase() +
                              fieldName.slice(1)
                            }`}
                            onChange={handleChange}
                            className="max-h-[150px] min-h-[150px] h-[150px] w-[400px] max-w-[400px] outline-none border rounded-md px-3 py-2"
                          ></textarea>
                        ) : (
                          <select
                            name={fieldName}
                            value={productDetails[fieldName]}
                            onChange={handleChange}
                            className="border w-[400px] h-[30px] px-3 rounded-md"
                          >
                            <option
                              value=""
                              disabled
                              selected
                            >
                              Select category
                            </option>
                            <option value="computer">Computer</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="gadgets">Gadgets</option>
                            <option value="accessories">
                              Accessories
                            </option>{" "}
                          </select>
                        )}

                        <div className="text-f10 text-red mt-[0.5px] mb-[10px]">
                          {fieldErrors[fieldName] && (
                            <div className="error">{`Product ${fieldErrors[fieldName]}`}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="preview">
            <div className="max-w-[85%] md:max-w-[75%] mx-auto mt-4">
              <div className="preview-container"></div>
              <div className="preview-details">
                <h3 className=" font-bodyFamily text-f16 text-grey mt-2 font-wm">
                  {productDetails.category}
                </h3>
                <h2 className="text-f16 mt-3">{productDetails.name}</h2>
                <h3 className="text-pink text-f16 mt-3">
                  {`${
                    productDetails.price === ""
                      ? ""
                      : "$" + productDetails.price
                  }`}
                </h3>

                <p className="mt-3">{productDetails.description}</p>
              </div>
            </div>
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
