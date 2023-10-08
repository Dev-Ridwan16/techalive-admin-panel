import React from "react";
import { BottomNav, Headbar, Sidebar } from "./Bar";
import { Board } from "./Board";
import { DeleteConfirmation } from "../../layouts/DeleteConfirmation";

export const AdminPanel = () => {
  return (
    <div className="flex flex-row">
      <DeleteConfirmation />
      <Sidebar />
      <div className="flex flex-col w-full">
        <Headbar />
        <Board />
      </div>
      <BottomNav />
    </div>
  );
};
