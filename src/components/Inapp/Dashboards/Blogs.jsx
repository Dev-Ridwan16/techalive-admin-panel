import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Notifications } from "../../../layouts/Notifications";
import NewPost from "./NewPost";
import ReactQuill from "react-quill";
import axios from "axios";
import Cookie from "js-cookie";
import "../../../Style/Inapp.css";
import "react-quill/dist/quill.snow.css";
import { DeleteConfirmation } from "../../../layouts/DeleteConfirmation";

export const Blogs = () => {
  const [postedBlogs, setPostedBlogs] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showNotification, setShowNotification] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [editBlog, setEditBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const pathName = location.pathname === "/admin-panel/blogs";

  const screenSize = window.innerWidth;

  const jwtToken = Cookie.get("jwt");

  useEffect(() => {
    const handleOnlineStatusChange = function () {
      setIsOnline(true);
    };

    const handleOfflineStatusChange = function () {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOfflineStatusChange);
  });

  const handleNavigateToParent = () => {
    navigate("/admin-panel/blogs/new-blog-post");
    setUpdateBtn(false);
  };

  useEffect(() => {
    const getAllBlogs = async () => {
      setShowNotification(true);
      try {
        const response = await axios.get(
          "https://techalive.onrender.com/api/v1/blog-post/all-blogs",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const data = response.data;

        setPostedBlogs(data.allBlogs);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStatus("warning");
          navigate("/login");
        }

        console.log(error);

        !isOnline ? setStatus("offline") : null;
      }
    };

    getAllBlogs();
  });

  const handleEditBlog = (blog) => {
    setEditBlog(blog);

    setUpdateBtn(true);
    navigate("/admin-panel/blogs/new-blog-post");
  };

  const handleDeleteBlog = async (blog) => {
    try {
      await axios.delete(
        `https://techalive.onrender.com/api/v1/blog-post/${blog}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      setConfirmDelete(false);
    } catch (error) {}
  };

  const closeConfirm = function () {
    setConfirmDelete(false);
  };

  return (
    <div>
      {confirmDelete && (
        <DeleteConfirmation
          closeConfirm={closeConfirm}
          handleDeleteAll={() => {
            handleDeleteBlog(blogToDelete);
          }}
        />
      )}
      <div className="blogs-container">
        <Notifications
          status={status}
          showNotification={showNotification}
        />

        <div className="lead-top">
          <h1 className="board-header text-f14">
            {pathName ? "Blog - Dashboard" : "Create new post"}
          </h1>

          {pathName && (
            <input
              type="search"
              name="search"
              placeholder="Search blog"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          )}

          <button
            className={pathName ? "parent" : "child"}
            onClick={() => {
              pathName ? handleNavigateToParent() : navigate(-1);
            }}
          >
            {pathName ? (screenSize < 768 ? "+" : "New post +") : "Go back"}
          </button>
        </div>
        <div className="slide-board">
          {pathName ? (
            <div className="show-posted-blogs">
              {postedBlogs
                .filter((blogs) =>
                  searchValue.toLowerCase() === ""
                    ? blogs
                    : blogs.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                )
                .map((blog, index) => (
                  <div
                    key={index}
                    className="blog-wrapper"
                  >
                    <img
                      src={blog.image}
                      alt="blog-image"
                    />

                    <div className="server-action">
                      <i
                        className="pi pi-pencil"
                        onClick={() => handleEditBlog(blog)}
                      />
                      <i
                        className="pi pi-trash"
                        onClick={() => {
                          setBlogToDelete(blog._id);
                          setConfirmDelete(true);
                        }}
                      />
                    </div>

                    <div className="overlay">
                      <div className="the-blog-contents">
                        <h2>{blog.title}</h2>
                        <p>{blog.author}</p>
                        <p>{blog.createdOn}</p>
                        <button>Read post</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Routes>
              <Route
                path="new-blog-post"
                element={
                  <NewPost
                    editBlog={editBlog}
                    updateBtn={updateBtn}
                  />
                }
              />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};
