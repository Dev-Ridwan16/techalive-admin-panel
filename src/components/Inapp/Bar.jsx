import React, { useEffect, useState } from "react"
import { sidebar_links } from "../../../default-api"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import "../../Style/Inapp.css"
import ProfileCard from "../../layouts/ProfileCard"

export const Sidebar = ({ handleLogout }) => {
  const [active, setActive] = useState(null)
  const isTablet = window.innerWidth <= 1023

  const handleActive = function (index) {
    setActive(index === active ? null : index)
  }

  // Implemented logout handler in AdminPanel.jsx

  return (
    <div className="sidebar-container">
      <div
        className={`header flex ${
          isTablet ? "flex-col items-center" : "flex-row items-center"
        } items-center gap-3`}
      >
        <img
          src="https://i.imgur.com/UKGl5Qk.png"
          alt=""
        />
        <h1 className="text-f16">Techalive</h1>
      </div>
      <div className="links">
        {sidebar_links.map((link, index) => (
          <div
            key={index}
            className={`nav-links ${index === active ? "active" : ""}`}
            onClick={() => handleActive(index)}
          >
            <Link to={link.path}>
              {isTablet ? (
                <i className={`pi ${link.icon}`}></i>
              ) : (
                <div className="wind-link">
                  <i className={`pi ${link.icon}`}></i>
                  {link.name}
                </div>
              )}
            </Link>

            {/* {isTablet ? null : <Link to={link.path}>{link.name}</Link>} */}
          </div>
        ))}
      </div>
      <div className="logout-btn">
        <button onClick={handleLogout}>
          <i className="pi pi-sign-out"></i>
          {isTablet ? null : <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

export const Headbar = () => {
  const user = useSelector((state) => state.user)
  const [showCard, setShowCard] = useState(false)

  const handleShowCard = () => setShowCard(true)
  const handleCloseCard = () => setShowCard(false)

  return (
    <div className="border-b h-[60px] flex items-center">
      <div className="flex flex-row items-center justify-between w-[95%] md:max-w-[550px] lg:max-w-[900px] mx-auto">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for..."
            className="border outline-none w-[200px] md:w-[250px] lg:w-[300px] h-[30px] rounded-full px-5"
          />
          <i className="pi pi-search absolute left-[100%] top-0 translate-x-[-200%] translate-y-[10px] text-gray-300" />
        </div>
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={handleShowCard}
        >
          <img
            src={user.image}
            alt=""
            className="w-[30px] h-[30px] rounded-full"
          />
          <span>
            {user.name.length > 15 ? user.name.slice(0, 16) + "..." : user.name}
          </span>
          <i className="pi pi-angle-down" />
        </div>
      </div>
      {showCard && (
        <ProfileCard
          closeCard={handleCloseCard}
          showCard={showCard}
        />
      )}
    </div>
  )
}

export const BottomNav = () => {
  const [active, setActive] = useState(null)

  const handleActive = function (index) {
    setActive(index === active ? null : index)
  }

  return (
    <div className="flex md:hidden items-end justify-end fixed w-full bottom-0">
      <div className="bottom-nav">
        {sidebar_links.map((link, index) => (
          <div
            key={index}
            className={`nav-links ${index === active ? "active" : ""}`}
            onClick={() => handleActive(index)}
          >
            <Link to={link.path}>
              <i className={`pi ${link.icon} text-f20`}></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export const LogoutModal = () => {
  return (
    <div
      className={`
    absolute z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
    h-[100px] w-[150px] rounded-md shadow-lg bg-[#fff]`}
    >
      <div className="flex flex-col items-center justify-center gap-2 h-full">
        <span>Login out user</span>
        <i className="pi pi-spin pi-spinner" />
      </div>
    </div>
  )
}
