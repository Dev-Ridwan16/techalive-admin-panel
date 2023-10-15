import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { overview_total } from "../../../default-api";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/loadingSlice";

import AddImage from "../../assets/add-image.png";
import axios from "axios";

import { Notifications } from "../../layouts/Notifications";
import { DeleteConfirmation } from "../../layouts/DeleteConfirmation";

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
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://techalive.onrender.com/api/v1/product/all-products"
        );

        const { data } = response.data;

        setAllProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://techalive.onrender.com/api/v1/user/get-users"
        );

        const { data } = response.data;
        setAllUsers(data.getAllUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
    getUsers();
  });

  return (
    <div>
      <h1 className="board-header">Overview</h1>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <h4 className="font-bodyFamily">Products</h4>
          <div className="dashboard-content">
            <i className="pi pi-chart-pie dashboard-icon"></i>
            <h2 className="flex items-center justify-center h-full text-f25 ">
              {allProducts.length}
            </h2>
          </div>
        </div>
        <div className="dashboard-wrapper">
          <h4 className="font-bodyFamily">Workers</h4>
          <div className="dashboard-content">
            <i className="pi pi-users dashboard-icon"></i>
            <h2 className="flex items-center justify-center h-full text-f25 ">
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className="dashboard-wrapper">
          <h4 className="font-bodyFamily">Blogs</h4>
          <div className="dashboard-content">
            <i className="pi pi-chart-bar dashboard-icon"></i>
            <h2 className="flex items-center justify-center h-full text-f25 ">
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className="dashboard-wrapper">
          <h4 className="font-bodyFamily">Reviews</h4>
          <div className="dashboard-content">
            <i className="pi pi-eye dashboard-icon"></i>
            <h2 className="flex items-center justify-center h-full text-f25 ">
              {allUsers.length}
            </h2>
          </div>
        </div>
        <div className="dashboard-wrapper">
          <h4 className="font-bodyFamily">Appointments</h4>
          <div className="dashboard-content">
            <i className="pi pi-inbox dashboard-icon"></i>
            <h2 className="flex items-center justify-center h-full text-f25 ">
              {allUsers.length}
            </h2>
          </div>
        </div>
      </div>
      <div className="workers-container">
        <h1>Workers</h1>
        <p>Techalive consult ltd. workers </p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>User</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Date formatter javascript function
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export const Products = function () {
  const isTablet = window.innerWidth >= 768;
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [pathnameChange, setPathnameChange] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [mLoad, setMLoad] = useState(false); //For auto refresh
  const [searchProduct, setSearchProduct] = useState("");
  const [productData, setProductData] = useState([]);
  const [noDataFound, setNoDataFound] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(5000);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleNavigate = function () {
    navigate("/admin-panel/products/add-new-product");
    setPathnameChange(false);
  };

  useEffect(() => {
    const handleOnlineStatusChange = function () {
      setIsOnline(true);
    };

    const handleOfflineStatusChange = function () {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOfflineStatusChange);
  });

  // get all products
  useEffect(() => {
    const getProducts = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axios.get(
          "https://techalive.onrender.com/api/v1/product/all-products"
        );
        const { data } = response.data;
        setProductData(data.products);

        setDate();
        switch (response.status) {
          case 200:
            dispatch(setLoading(false));
            break;
          default:
        }
        if (data.products.length === 0) {
        }
        setDate(newDate.toLocaleDateString("en-US", options));
      } catch (error) {
        console.log("Error:", error);
        setShowNotification(true);
        !isOnline ? setStatus("offline") : null;
      } finally {
        dispatch(setLoading(false));
      }
    };

    // getProducts();

    const interval = setInterval(
      getProducts,
      pollingInterval,
      setShowNotification(false)
    );

    return () => clearInterval(interval);
  }, [productData]);

  const handleDeleteAll = async () => {
    setMLoad(true);
    try {
      const result = await axios.delete(
        "https://techalive.onrender.com/api/v1/product/delete-products"
      );
      setMLoad(false);
      switch (result.status) {
        case 204:
          setShowNotification(true);
          setStatus("deleted");
          setOpenConfirm(false);
          break;
        default:
      }
    } catch (error) {
      console.log("Error", error);
      setShowNotification(true);
      !isOnline ? setStatus(true) : null;
      dispatch(setLoading(false));
    } finally {
      setMLoad(false);
    }
  };

  useEffect(() => {
    const interval = setTimeout(function () {
      setShowNotification(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

  const closeConfirm = function () {
    setOpenConfirm(false);
  };

  return (
    <div className="product-page">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1 className="board-header">Products</h1>
        {location.pathname === "/admin-panel/products/add-new-product" ? (
          <button
            className="w-[50px] md:w-[100px] h-[30px] border rounded flex items-center gap-3 justify-center"
            onClick={() => navigate(-1)}
          >
            <i className="pi pi-arrow-left"></i>
            <span className="hidden md:block">Go Back</span>
          </button>
        ) : null}
      </div>
      {location.pathname !== "/admin-panel/products" ? null : isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <i className="pi pi-spin pi-spinner" />
          <span>Loading...</span>
        </div>
      ) : null}

      <div className="">
        <div className="toggle-board">
          {location.pathname === "/admin-panel/products" ? (
            <div>
              <Notifications
                status={status}
                showNotification={showNotification}
              />
              {openConfirm && (
                <DeleteConfirmation
                  handleDeleteAll={handleDeleteAll}
                  closeConfirm={closeConfirm}
                  mLoad={mLoad}
                />
              )}
              <div className="flex flex-row item-center justify-between">
                <button
                  className={`w-[50px] md:w-[150px] h-[30px] bg-grey bg-opacity-10 rounded`}
                  onClick={handleNavigate}
                >
                  {isTablet ? "Add New Product +" : "+"}
                </button>

                <input
                  type="search"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  placeholder="Search for product..."
                  className="outline-none border rounded-full w-[150px] md:w-[250px] h-[25px] px-3 text-f10"
                />

                <div className="flex items-center gap-2">
                  <i className="pi pi-circle-fill text-green-500"></i>
                  <span>Total Products:</span>
                  <span className="text-f16">{productData.length}</span>
                </div>
              </div>
              <div>
                <button
                  disabled={productData.length < 1 ? true : false}
                  onClick={() => setOpenConfirm(true)}
                  className="bg-red text-[#fff] w-[100px] h-[30px] mt-5 flex gap-2 items-center justify-center rounded"
                >
                  <span>Delete All</span>
                  <i className="pi pi-trash"></i>
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    {isTablet ? <th>Description</th> : null}
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {productData.length < 1 ? (
                  <h1 className="text-center mt-10  text-f20">
                    Found No Data!
                  </h1>
                ) : (
                  <tbody>
                    {productData
                      .filter((product) =>
                        searchProduct.toLowerCase() === ""
                          ? product
                          : product.name
                              .toLowerCase()
                              .includes(searchProduct.toLowerCase())
                      )
                      .map((product, index) => (
                        <tr key={index}>
                          <td>
                            {/* <img src={`/img/products/${product.image}`} /> */}
                            <img src={`${product.image}`} />
                          </td>
                          <td>{product.name}</td>
                          <td>{product.category}</td>
                          <td>$ {product.price}</td>

                          {isTablet ? (
                            <td>
                              {product.description.length > 10
                                ? product.description.slice(0, 10) + "..."
                                : product.description}
                            </td>
                          ) : null}

                          <td>{formatDate(product.date)}</td>
                          <td>
                            <ul className="flex items-center justify-center gap-5">
                              <li>
                                <i className="pi pi-pencil text-green-600"></i>
                              </li>
                              <li>
                                <i className="pi pi-trash text-red"></i>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table>
            </div>
          ) : null}
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
    category: "",
    description: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [status, setStatus] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [filePreview, setFilePreview] = useState(null);

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

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setSelectedFileName(selectedFile.name);

      if (selectedFile.type.startsWith("image/")) {
        const previewURL = URL.createObjectURL(selectedFile);
        setFilePreview(previewURL);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFilePreview(null);
    setSelectedFileName("");
    fileInputRef.current.value = "";
  };

  // Check connection
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(true);
    };

    const handleOfflineStatusChange = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOfflineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOfflineStatusChange);
    };
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      const formData = new FormData();

      // Append the image file to the FormData
      if (fileInputRef.current.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      // Append other product details to the FormData
      formData.append("name", productDetails.name);
      formData.append("price", productDetails.price);
      formData.append("category", productDetails.category);
      formData.append("description", productDetails.description);
      try {
        const response = await axios.post(
          "https://techalive.onrender.com/api/v1/product/add-product",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        switch (response.status) {
          case 201:
            setShowNotification(true);
            setStatus("success");
            setIsLoading(false);
            setProductDetails({
              name: "",
              price: "",
              category: "",
              description: "",
            });
            setFilePreview(null);
            setSelectedFileName("");
            fileInputRef.current.value = "";
            break;
        }
      } catch (error) {
        !isOnline ? setStatus("offline") : null;
        setShowNotification(true);
        setIsLoading(false);
      }
    } else {
      setIsLoading(isLoading);
    }
  };

  useEffect(() => {
    const interval = setInterval(function () {
      setShowNotification(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);
  return (
    <div className="">
      {isLoading && (
        <div className=" absolute top-0 left-0 w-screen h-screen"></div>
      )}
      <div className="float-right">
        <Notifications
          status={status}
          showNotification={showNotification}
        />
      </div>
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
            {`${!!isLoading ? "Adding" : "Add Product"}`}
            {isLoading && (
              <i className="pi pi-spin pi-spinner text-f12 ml-3"></i>
            )}
          </button>
        </div>
        {/* Details and Preview */}
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="product-infomation ">
            <div className="product-information-wrapper">
              <div className="flex flex-col gap-3">
                <label htmlFor="">Image</label>
                <div className="flex flex-row items-center gap-2">
                  <div
                    className="border flex flex-row items-center justify-center rounded-md p-3 w-[80px] h-[80px] cursor-pointer"
                    onClick={handleFileSelect}
                  >
                    <img
                      src={AddImage}
                      alt=""
                      className="custom-image"
                    />
                    <input
                      name="image"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    {selectedFileName && (
                      <div className="flex items-center gap-3">
                        <p className=" bg-gray-300 p-1 rounded">
                          {selectedFileName}
                        </p>
                        <i
                          className="pi pi-times text-f10 text-red"
                          onClick={handleRemoveFile}
                        />
                      </div>
                    )}
                  </div>
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
                            type={fieldName === "price" ? "number" : "text"}
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
                            <option value="Accessories">Accessories</option>
                            <option value="Computer">Computer</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Smartphones">Smartphones</option>
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
              <div className="preview-container">
                {filePreview && typeof filePreview === "string" && (
                  <img
                    src={filePreview}
                    alt=""
                  />
                )}
              </div>
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
                <div
                  className="mt-3 w-[400px] min-h-[150px] max-h-[150px] h-[150px] overflow-y-scroll border rounded-md"
                  style={{ wordWrap: "break-word" }}
                >
                  {productDetails.description}
                </div>
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
