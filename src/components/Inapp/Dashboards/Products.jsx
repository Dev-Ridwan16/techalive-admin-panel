import React, { useState, useEffect } from "react"
import axios from "axios"
import Cookie from "js-cookie"

import { AddProduct } from "./AddProduct"
import EditingModal from "../../../layouts/EditingModal"
import { Notifications } from "../../../layouts/Notifications"
import {
  DeleteConfirmation,
  DeleteSingleConfirmation,
} from "../../../layouts/DeleteConfirmation"

import { Routes, Route, useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../../features/loadingSlice"
import { current } from "@reduxjs/toolkit"

// Date formatter javascript function
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

export const Products = function () {
  const isTablet = window.innerWidth >= 768
  const navigate = useNavigate()
  const [status, setStatus] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [pathnameChange, setPathnameChange] = useState(true)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [mLoad, setMLoad] = useState(false) //For auto refresh
  const [searchProduct, setSearchProduct] = useState("")
  const [productData, setProductData] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedProductName, setSelectedProductName] = useState("")
  const [popup, setPopup] = useState(false)
  const [pollingInterval, setPollingInterval] = useState(5000)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const { isLoading } = useSelector((state) => state.loading)
  const dispatch = useDispatch()

  const handleNavigate = function () {
    navigate("/admin-panel/products/add-new-product")
    setPathnameChange(false)
  }

  useEffect(() => {
    const handleOnlineStatusChange = function () {
      setIsOnline(true)
    }

    const handleOfflineStatusChange = function () {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnlineStatusChange)
    window.addEventListener("offline", handleOfflineStatusChange)
  })

  const jwtToken = Cookie.get("jwt")

  // get all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          "https://techalive.onrender.com/api/v1/product/all-products",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )

        const data = response.data
        setProductData(data.products)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus("warning")
          setShowNotification(true)

          setTimeout(() => {
            navigate("/login")
          }, 5000)
        }
        console.log("Error:", error)

        setShowNotification(true)
        !isOnline ? setStatus("offline") : null
      } finally {
        dispatch(setLoading(false))
      }
    }

    getProducts()

    // const interval = setInterval(
    //   getProducts,
    //   pollingInterval,
    //   setShowNotification(false)
    // )

    // return () => clearInterval(interval)
  })

  const handleDeleteAll = async () => {
    setMLoad(true)

    try {
      const result = await axios.delete(
        "https://techalive.onrender.com/api/v1/product/delete-products",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      setMLoad(false)

      switch (result.status) {
        case 204:
          setShowNotification(true)
          setStatus("deleted")
          setOpenConfirm(false)
          break
        default:
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setStatus("warning")
        setShowNotification(true)
        setTimeout(() => {
          navigate("/login")
        }, 5000)
      } else if (error.response && error.response.status === 403) {
        setStatus("info")
        setShowNotification(true)
      }
      console.log("Error", error)
      setShowNotification(true)
      !isOnline ? setStatus(true) : null
      dispatch(setLoading(false))
    } finally {
      setMLoad(false)
    }
  }

  useEffect(() => {
    const interval = setTimeout(function () {
      setShowNotification(false)
    }, 5000)

    return () => clearInterval(interval)
  }, [status])

  const closeConfirm = function () {
    setOpenConfirm(false)
  }

  /* --- Editing specific product */

  const handleEditProduct = (product) => {
    setPopup(true)
    setSelectedProduct(product)
  }

  const closeEditModal = () => {
    setPopup(false)
  }

  const handleDeleteConfirm = (product) => {
    setOpenConfirm(true)

    setSelectedProduct((prevProduct) => {
      console.log("Selected Product before update:", prevProduct)

      return product
    })

    console.log("Selected Product after update:", selectedProduct)

    setSelectedProductName(product.name)
  }

  /* --- Delete specific product */
  const handleDeleteProduct = async (product) => {
    setMLoad(true)
    try {
      const response = await axios.delete(
        `https://techalive.onrender.com/api/v1/product/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )

      switch (response.status) {
        case 204:
          setStatus("deleted")
          setShowNotification(true)
          setMLoad(false)
          setOpenConfirm(false)
          break
        default:
      }
    } catch (error) {}
  }

  return (
    <div className="product-page">
      {popup && (
        <EditingModal
          selectedProduct={selectedProduct}
          closeEditModal={closeEditModal}
          popup={popup}
        />
      )}
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
                // <DeleteConfirmation
                //   handleDeleteAll={handleDeleteAll}
                //   closeConfirm={closeConfirm}
                //   mLoad={mLoad}
                // />

                <DeleteSingleConfirmation
                  handleDeleteProduct={() => {
                    handleDeleteProduct(selectedProduct)
                    console.log(selectedProduct)
                  }}
                  closeConfirm={closeConfirm}
                  mLoad={mLoad}
                  productName={selectedProductName}
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
              {/* <div>
                <button
                  disabled={productData.length < 1 ? true : false}
                  onClick={() => setOpenConfirm(true)}
                  className="bg-red text-[#fff] w-[100px] h-[30px] mt-5 flex gap-2 items-center justify-center rounded"
                >
                  <span>Delete All</span>
                  <i className="pi pi-trash"></i>
                </button>
              </div> */}

              <div className="list-product-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-y-scroll lg:h-[400px] mt-5">
                {productData
                  .filter((product) =>
                    searchProduct.toLowerCase() === ""
                      ? product
                      : product.name
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                  )
                  .map((product, index) => (
                    <div
                      key={index}
                      className="listed-product h-[250px] border border-collapse border-[#afafaf23] p-[10px] relative"
                    >
                      <div className="lead-head relative mb-3">
                        <div className="action-btns flex flex-row gap-3 absolute left-[97%] translate-x-[-97%] opacity-0 ease-in-out duration-500">
                          <i
                            onClick={() => handleEditProduct(product)}
                            className="pi pi-pencil text-green-600"
                          />
                          <i
                            onClick={() => handleDeleteConfirm(product)}
                            className="pi pi-trash text-red"
                          ></i>
                        </div>
                        <div>
                          <h1>{product.name}</h1>
                          <p>{product.category}</p>
                        </div>
                      </div>
                      <img
                        src={product.image}
                        alt={`${product.name} image`}
                        className="w-[80%] h-[150px] mx-auto"
                      />
                      <div className="flex flex-row justify-between mt-2">
                        <p>{formatDate(product.date)}</p>
                        <h1>{`$${product.price}`}</h1>
                      </div>
                    </div>
                  ))}
              </div>

              {/* <table>
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
                            <img
                              src={product.image}
                              className="w-[60px] h-[60px]"
                            />
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
                              <li onClick={() => handleEditProduct(product)}>
                                <i className="pi pi-pencil text-green-600"></i>
                              </li>
                              <li
                                // onClick={() => handleDeleteProduct(product)}
                                onClick={() => handleDeleteConfirm(product)}
                              >
                                <i className="pi pi-trash text-red"></i>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </table> */}
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
  )
}
