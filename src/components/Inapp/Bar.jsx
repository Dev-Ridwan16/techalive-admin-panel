import React, { useState } from "react";

import "../../Style/Inapp.css";
import { sidebar_links } from "../../../default-api";
import { Link } from "react-router-dom";

// export

export const Sidebar = () => {
  const [active, setActive] = useState(null);

  const handleActive = function (index) {
    setActive(index === active ? null : index);
  };
  return (
    <div className="sidebar-container">
      <div className="header">
        <img
          src="https://i.imgur.com/UKGl5Qk.png"
          alt=""
        />
      </div>
      <div className="links">
        {sidebar_links.map((link, index) => (
          <div
            key={index}
            className={`nav-links ${index === active ? "active" : ""}`}
            onClick={() => handleActive(index)}
          >
            <i className={`pi ${link.icon}`}></i>
            <Link to={link.path}>{link.name}</Link>
          </div>
        ))}
      </div>
      <div className="logout-btn">
        <button>
          <i className="pi pi-sign-out"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export const Headbar = () => {
  return (
    <div className="border-b h-[60px] flex items-center">
      <div className="flex flex-row items-center justify-between w-full max-w-[900px] mx-auto">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for..."
            className="border outline-none w-[300px] h-[30px] rounded-full px-5"
          />
          <i className="pi pi-search absolute left-[100%] top-0 translate-x-[-200%] translate-y-[10px] text-gray-300" />
        </div>
        <div className="flex items-center justify-between w-[100px]">
          <i className="pi pi-user" />
          <span>Ridwan</span>
          <i className="pi pi-angle-down" />
        </div>
      </div>
    </div>
  );
};
