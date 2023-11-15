import React from "react"

export const DeleteConfirmation = ({
  closeConfirm,
  handleDeleteAll,
  mLoad,
}) => {
  let question

  const pathName = ["/admin-panel/products", "/admin-panel/blogs"]

  switch (location.pathname) {
    case pathName[0]:
      question = "delete all products"
      break
    case pathName[1]:
      question = "delete this blog"
      break
    default:
  }

  return (
    <div className="del-container">
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
    </div>
  )
}

export const DeleteSingleConfirmation = ({
  closeConfirm,
  handleDeleteProduct,
  mLoad,
  productName,
}) => {
  return (
    <div className="del-container">
      <div className="confirm-del-container">
        <div className="confirmation">
          <h3>Confirm Delete!</h3>

          <hr />

          <p>Are you sure you want to {productName}?</p>

          <div className="confirm-btns">
            <button onClick={closeConfirm}>Cancle</button>
            <button onClick={handleDeleteProduct}>
              {mLoad ? `Deleting...` : "Yes, Delete!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
