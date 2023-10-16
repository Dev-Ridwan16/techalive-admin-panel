import React, { useRef, useState } from "react";
import "../Style/layout/EditingModal.css";

export default function EditingModal({
  selectedProduct,
  closeEditModal,
  popup,
}) {
  const [editForm, setEditForm] = useState(selectedProduct);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState("");
  const imageRef = useRef(null);

  const handleImageSelect = () => {
    imageRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageName(file.name);
    }

    if (file.type.startsWith("image/")) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };
  return (
    <div className="modal-overlay">
      <div
        className={`editing-modal-container ${
          popup ? "editing-modal-opacity" : ""
        }`}
      >
        <div className="lead-head">
          <h1>Editing {editForm.name}</h1>
          <button onClick={closeEditModal}>
            <span className="hidden md:block">Close</span>
            <i className="pi pi-times"></i>
          </button>
        </div>
        <div className="selectingFile">
          <div className="flex items-center gap-2">
            {imagePreview && typeof imagePreview === "string" ? (
              <img src={imagePreview} />
            ) : (
              <img src={editForm.image} />
            )}
            <p>{imageName}</p>
          </div>
          <button onClick={handleImageSelect}>Change Image</button>
          <input
            type="file"
            name="image"
            ref={imageRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <form action="">
          <input
            type="text"
            name="name"
            value={editForm.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="price"
            value={editForm.price}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={editForm.catergory}
            onChange={handleInputChange}
          >
            <option value="Accessories">Accessories</option>
            <option value="Computers">Computers</option>
            <option value="Electronics">Electronics</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Smartphones">Smartphones</option>
          </select>
          <textarea
            name=""
            id=""
          ></textarea>

          <button className="submit-update">Submit Upadte</button>
        </form>
      </div>
    </div>
  );
}
