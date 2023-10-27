import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookie from "js-cookie";
import { Notifications } from "../../../layouts/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../features/loadingSlice";

export default function NewPost() {
  const [disable, setDisable] = useState(true);
  const [blog, setBlog] = useState("");
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotifcation] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const [blogDetails, setBlogDetails] = useState({
    image: "",
    title: "",
    author: "",
  });

  const handleEditorValue = (value) => {
    setBlog(value);

    const isEditorEmpty = blog.trim().length < 100;
    setDisable(isEditorEmpty);
  };

  const handleBlogDetailChange = (e) => {
    const { name, value } = e.target;
    const updatedBlogDetails = { ...blogDetails, [name]: value };
    setBlogDetails(updatedBlogDetails);

    const isAnyFieldEmpty = Object.values(updatedBlogDetails).some(
      (field) => field.trim().length < 1
    );

    setDisable(isAnyFieldEmpty);
  };

  const post = {
    ...blogDetails,
    blog,
  };

  const jwtToken = Cookie.get("jwt");

  const handleSubmitBlog = async () => {
    setShowNotifcation(true);
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        "https://techalive.onrender.com/api/v1/blog-post/create-new-blog",
        post,

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(post);

      switch (response.status) {
        case 201:
          setStatus("success");
          dispatch(setLoading(false));
          break;
        default:
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setStatus("warning");
      }
    }
  };

  return (
    <div className="new-post-container">
      <div>
        <Notifications
          status={status}
          showNotification={showNotification}
        />
      </div>
      <div className="blog-details-wrapper">
        <div className="blog-details">
          <div className="details">
            <div className="field">
              <input
                name="image"
                type="text"
                className="img-link"
                placeholder="Image Link"
                value={blogDetails.image}
                onChange={handleBlogDetailChange}
                required
              />
              <i className="pi pi-link" />
            </div>

            <div className="field">
              <input
                name="title"
                type="text"
                className="blog-title"
                placeholder="Blog Title"
                value={blogDetails.title}
                onChange={handleBlogDetailChange}
                required
              />
              <i className="pi pi-arrow-up" />
            </div>
            <div className="field">
              <input
                name="author"
                type="text"
                className="author"
                placeholder="Author Name"
                value={blogDetails.author}
                onChange={handleBlogDetailChange}
                required
              />
              <i className="pi pi-user" />
            </div>
          </div>
          <div className="img-preview">
            <img
              src={blogDetails.image}
              alt=""
            />
          </div>
        </div>
        <button
          className={`post-btn ${disable ? "btn-disable" : ""}`}
          disabled={disable ? true : false}
          onClick={handleSubmitBlog}
        >
          {isLoading ? (
            <p>
              <span>Posting...</span> <i className="pi pi-spin pi-spinner" />
            </p>
          ) : (
            "Post blog"
          )}
        </button>
      </div>
      <ReactQuill
        theme="snow"
        value={blog}
        onChange={handleEditorValue}
        className="react-quill-editor"
      />
    </div>
  );
}
