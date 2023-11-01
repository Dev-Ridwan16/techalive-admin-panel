import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Cookie from "js-cookie";
import { Notifications } from "../../../layouts/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../features/loadingSlice";

export default function NewPost({ editBlog, updateBtn }) {
  const [disable, setDisable] = useState(true);
  const [blog, setBlog] = useState("");
  const [status, setStatus] = useState("");
  const [showNotification, setShowNotifcation] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const [editingBlog, setEditingBlog] = useState(editBlog);
  const [theBlog, setTheBlog] = useState(updateBtn && editBlog.blog);

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
          setBlogDetails({
            image: "",
            title: "",
            author: "",
          });
          setBlog("");
          break;
        default:
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setStatus("warning");
      }
    }
  };

  const handleEditingBlog = (e) => {
    const { name, value } = e.target;
    const blogEdited = { ...editingBlog, [name]: value };
    setEditingBlog(blogEdited);

    const isAnyFieldEmpty = Object.values(blogEdited).some(
      (field) => typeof field === "string" && field.trim().length < 1
    );

    setDisable(isAnyFieldEmpty);
  };

  const handleBlogEdit = (value) => {
    // if (updateBtn) {
    setTheBlog(value);

    const isEditorEmpty = value.trim().length < 100;
    setDisable(isEditorEmpty);
    // }
  };

  const handleUpdateBlog = async () => {
    console.log(theBlog);
    dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `https://techalive.onrender.com/api/v1/blog-post/${editBlog._id}`,
        {
          ...editingBlog,
          blog: theBlog,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log(theBlog);

      switch (response.status) {
        case 200:
          setShowNotifcation(true);
          setStatus("success");
          dispatch(setLoading(false));
          setEditingBlog({
            image: "",
            author: "",
            title: "",
          });

          setTheBlog("");
          console.log(theEditedVersion);
          break;
        default:
      }
    } catch (error) {
      setShowNotifcation(true);
      if (error.response && error.response.status === 401) {
        setStatus("warning");
      }

      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotifcation(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [status]);

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
                value={updateBtn ? editingBlog.image : blogDetails.image}
                onChange={
                  updateBtn ? handleEditingBlog : handleBlogDetailChange
                }
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
                value={updateBtn ? editingBlog.title : blogDetails.title}
                onChange={
                  updateBtn ? handleEditingBlog : handleBlogDetailChange
                }
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
                value={updateBtn ? editingBlog.author : blogDetails.author}
                onChange={
                  updateBtn ? handleEditingBlog : handleBlogDetailChange
                }
                required
              />
              <i className="pi pi-user" />
            </div>
          </div>
          <div className="img-preview">
            <img
              src={updateBtn ? editingBlog.image : blogDetails.image}
              alt=""
            />
          </div>
        </div>
        <button
          className={`post-btn ${disable ? "btn-disable" : ""}`}
          disabled={
            updateBtn ? (disable ? true : false) : disable ? true : false
          }
          onClick={updateBtn ? handleUpdateBlog : handleSubmitBlog}
        >
          {isLoading && !updateBtn ? (
            <p>
              <span>Posting...</span> <i className="pi pi-spin pi-spinner" />
            </p>
          ) : updateBtn ? (
            isLoading ? (
              <p>
                <span>Updaitng</span> <i className="pi pi-spin pi-spinner" />
              </p>
            ) : (
              "Update Blog"
            )
          ) : (
            "Post blog"
          )}
        </button>
      </div>
      <ReactQuill
        theme="snow"
        value={updateBtn ? theBlog : blog}
        onChange={updateBtn ? handleBlogEdit : handleEditorValue}
        className="react-quill-editor"
      />
    </div>
  );
}
