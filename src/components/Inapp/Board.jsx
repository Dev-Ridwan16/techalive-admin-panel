import React from "react";
import { Route, Routes } from "react-router-dom";

export const Board = () => {
  return (
    <div className="flex justify-center items-center w-full h-full ">
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
      <h1 className="text-f40 font-wb"> Overview Dashboard!</h1>
    </div>
  );
};

export const Products = () => {
  return (
    <div>
      <h1 className="text-f40 font-wb"> Products panel!</h1>
    </div>
  );
};

export const Blogs = () => {
  return (
    <div>
      <h1 className="text-f40 font-wb"> Blogs panel!</h1>
    </div>
  );
};

export const Appointments = () => {
  return (
    <div>
      <h1 className="text-f40 font-wb"> Appointments panel!</h1>
    </div>
  );
};

export const Reviews = () => {
  return (
    <div>
      <h1 className="text-f40 font-wb"> Reviews panel!</h1>
    </div>
  );
};

export const Settings = () => {
  return (
    <div>
      <h1 className="text-f40 font-wb"> Settings !</h1>
    </div>
  );
};
