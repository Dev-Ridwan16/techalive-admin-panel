import React from "react";

export const DeleteConfirmation = ({
  closeConfirm,
  handleDeleteAll,
  mLoad,
}) => {
  let question;

  switch (location.pathname) {
    case "/admin-panel/products":
      question = "delete all products";
      break;
    case "/admin-panel/blogs":
      question = "delete all blogs";
      break;
    default:
  }

  return (
    <div className="confirm-del-container">
      <div className="confirmation">
        <h3>Confirm Delete!</h3>

        <hr />

        <p>Are you sure you want to {question}?</p>

        <div className="confirm-btns">
          <button onClick={closeConfirm}>Cancle</button>
          <button onClick={handleDeleteAll}>
            {mLoad ? `Deleting...` : "Yes, Delete!"}
          </button>
        </div>
      </div>
    </div>
  );
};
