import React from "react";
import { Headbar, Sidebar } from "./Bar";
import { Board } from "./Board";

export const AdminPanel = () => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Headbar />
        <Board />
      </div>
    </div>
  );
};
