import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { overview_total } from "../../../default-api";

import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/loadingSlice";

import axios from "axios";
import Cookie from "js-cookie";

import { Notifications } from "../../layouts/Notifications";
import { DeleteConfirmation } from "../../layouts/DeleteConfirmation";
import EditingModal from "../../layouts/EditingModal";
import { Products } from "./Dashboards/Products";
import { AddProduct } from "./Dashboards/AddProduct";
import { Blogs } from "./Dashboards/Blogs";
import { Appointments } from "./Dashboards/Appointments";
import { Reviews } from "./Dashboards/Reviews";
import Settings from "./Dashboards/Settings";
import NewPost from "./Dashboards/NewPost";

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
        >
          <Route
            path="new-blog-post"
            element={<NewPost />}
          />
        </Route>
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

  const jwtToken = Cookie.get("jwt");

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
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
