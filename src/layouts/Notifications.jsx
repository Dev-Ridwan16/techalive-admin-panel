import React, { useState, useEffect } from "react";

import "../Style/layout/layout.css";

export const Notifications = ({ status, showNotification }) => {
  let notification_message;

  let notify;

  const thePaths = [
    "admin-panel/blogs",
    "/admin-panel/products/add-new-product",
    "/admin-panel/products",
  ];

  switch (status) {
    case "success":
      if (location.pathname === "/signup") {
        notification_message = "Account created successfully";
      } else if (location.pathname === "/login") {
        notification_message = "Login successfully";
      } else if (
        location.pathname === "/admin-panel/products/add-new-product"
      ) {
        notification_message = "Product added successfully";
      } else if (location.pathname === "admin-panel/blogs") {
        notification_message = "Your blog has been posted";
      }
      notify = <Success notification_message={notification_message} />;
      break;

    case "warning":
      if (location.pathname === "/signup") {
        notification_message = "User Already Exist";
      } else if (location.pathname === "/login") {
        notification_message = "Incorrect Email or password";
      } else if (thePaths.includes(location.pathname)) {
        notification_message = "Please Login Again";
      }
      notify = <Warning notification_message={notification_message} />;
      break;
    case "info":
      if (thePaths.includes(location.pathname)) {
        notification_message = "You can't perform this action";
      }
      notify = <Info notification_message={notification_message} />;
      break;
    case "danger":
      notify = <Danger />;
      break;
    case "offline":
      notify = <Offline />;
      break;
    case "deleted":
      notify = <Deleted />;
      break;
    default:
  }

  return (
    <div
      className={`notification ${status} ${
        showNotification ? "slide-show" : ""
      }`}
    >
      <div className="notification-content">{notify}</div>
    </div>
  );
};

export const Success = ({ notification_message }) => {
  return (
    <div className="h-[70px] bg-green-500 bg-opacity-70 text-green-900 text-f16 flex items-center px-2 rounded-lg">
      <div className="flex items-center gap-3">
        <i className="pi pi-check-circle" />
        <span>{notification_message}</span>
      </div>
    </div>
  );
};

export const Info = ({ notification_message }) => {
  return (
    <div className="h-[70px] bg-[#fff] text-indigo-900 text-f16 flex items-center px-2 rounded-lg shadow-xl ">
      <div className="flex items-center gap-3">
        <i className="pi pi-info-circle" />
        <span>{notification_message}</span>
      </div>
    </div>
  );
};

export const Warning = ({ notification_message }) => {
  return (
    <div className="h-[70px] bg-amber-500 bg-opacity-70 text-amber-900 text-f16 flex items-center px-2 rounded-lg">
      <div className="flex items-center gap-3">
        <i className="pi pi-check-circle" />
        <span>{notification_message}</span>
      </div>
    </div>
  );
};

export const Danger = () => {
  return (
    <div className="h-[70px] bg-rose-500 bg-opacity-70 text-rose-900 text-f16 flex items-center px-2 rounded-lg">
      <div className="flex items-center gap-3">
        <i className="pi pi-check-circle" />
        <span>An Error Occured</span>
      </div>
    </div>
  );
};

export const Offline = () => {
  return (
    <div className="h-[70px] bg-neutral-500 bg-opacity-70 text-slate-100 text-f16 flex items-center px-2 rounded-lg">
      <div className="flex items-center gap-3 w-full flex-nowrap">
        <i className="pi pi-wifi" />
        <span>Check your internet connection</span>
      </div>
    </div>
  );
};

export const Deleted = () => {
  return (
    <div className="h-[70px] shadow-lg bg-rose-500 bg-opacity-70 text-rose-900 text-f16 flex items-center px-2 rounded-lg">
      <div className="flex items-center gap-3 w-full flex-nowrap">
        <i className="pi pi-trash" />
        <span>Deleted</span>
      </div>
    </div>
  );
};
