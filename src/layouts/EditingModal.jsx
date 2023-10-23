import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../Style/layout/EditingModal.css";
import { Notifications } from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../features/loadingSlice";
import Cookie from "js-cookie";

export default function EditingModal({
  selectedProduct,
  closeEditModal,
  popup,
}) {
  const [editForm, setEditForm] = useState(selectedProduct);
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { isloading } = useSelector((state) => state.loading);
  const jwtToken = Cookie.get("jwt");

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

  const handleSubmitProductUpdate = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    // const formData = new FormData();

    // if (imageRef.current.files[0]) {
    //   formData.append("image", imageRef.current.files[0]);
    // }

    // formData.append("name", editForm.name);
    // formData.append("price", editForm.price);
    // formData.append("category", editForm.category);
    // formData.append("description", editForm.description);
    try {
      const response = await axios.patch(
        `https://techalive.onrender.com/api/v1/product/${selectedProduct._id}`,
        editForm,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("Response", response.data);
      console.log(editForm);

      switch (response.status) {
        case 200:
          setStatus("success");
          setShowNotification(true);
          dispatch(setLoading(false));
          break;
        default:
      }
    } catch (error) {
      console.log(error);
    }
  };

  // close notification
  useEffect(() => {
    const interval = setInterval(function () {
      setShowNotification(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="modal-overlay">
      <div className="float-right">
        <Notifications
          status={status}
          showNotification={showNotification}
        />
      </div>
      <div
        className={`editing-modal-container ${
          popup ? "editing-modal-opacity" : ""
        }`}
      >
        <div className="lead-head">
          <h1>Editing</h1>
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
        <form
          action=""
          onSubmit={handleSubmitProductUpdate}
        >
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
            value={editForm.category}
            onChange={handleInputChange}
          >
            <option value="Accessories">Accessories</option>
            <option value="Computers">Computers</option>
            <option value="Electronics">Electronics</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Smartphones">Smartphones</option>
          </select>
          <textarea
            name="description"
            id=""
            value={editForm.description}
            onChange={handleInputChange}
          ></textarea>

          <button
            type="submit"
            className="submit-update"
          >
            {isloading ? (
              <p>
                <span>Updating</span>
                <i className="pi pi-spin pi-spinner" />
              </p>
            ) : (
              "Submit Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
