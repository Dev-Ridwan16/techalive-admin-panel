import React from "react";

export const DeleteConfirmation = () => {
  return (
    <div className="confirm-del-container">
      <div className="confirmation">
        <h3>Confirm Delete!</h3>

        <hr />

        <p>Are you sure you want to delete?</p>

        <div className="confirm-btns">
          <button>Cancle</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
};
