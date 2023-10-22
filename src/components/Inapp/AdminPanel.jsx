import React, { useState } from "react";
import { BottomNav, Headbar, LogoutModal, Sidebar } from "./Bar";
import { Board } from "./Board";
import { DeleteConfirmation } from "../../layouts/DeleteConfirmation";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AdminPanel = () => {
  const [logOutLoadinng, setLogOutLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogOutLoading(true);
    try {
      const response = await axios.get(
        "https://techalive.onrender.com/api/v1/user/logout"
      );

      if (response.status === 200) {
        Cookie.remove("jwt");
        setLogOutLoading(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-row">
      {/* <DeleteConfirmation /> */}
      <Sidebar handleLogout={handleLogout} />

      {logOutLoadinng && <LogoutModal />}
      <div className="flex flex-col w-full">
        <Headbar />
        <Board />
      </div>
      <BottomNav />
    </div>
  );
};
