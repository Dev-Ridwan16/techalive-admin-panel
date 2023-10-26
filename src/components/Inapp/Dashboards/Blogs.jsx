import React from "react";
import "../../../Style/Inapp.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Blogs = () => {
  const navigate = useNavigate();

  const pathName = location.pathname === "/admin-panel/blogs";

  const screenSize = window.innerWidth;

  return (
    <div className="blogs-container">
      <div className="lead-top">
        <h1 className="board-header text-f14">
          {pathName ? "Blog - Dashboard" : "Create new post"}
        </h1>

        {pathName && (
          <input
            type="search"
            name="search"
            placeholder="Search blog"
          />
        )}

        <button
          className={pathName ? "parent" : "child"}
          onClick={() => {
            pathName
              ? navigate("/admin-panel/blogs/new-blog-post")
              : navigate(-1);
          }}
        >
          {pathName ? (screenSize < 768 ? "+" : "New post +") : "Go back"}
        </button>
      </div>
      <div className="slide-board">
        {pathName ? (
          <div className="show-posted-blogs">
            <div className="blog-wrapper">
              <img
                src="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="blog-image"
              />

              <div className="server-action">
                <i className="pi pi-pencil" />
                <i className="pi pi-trash" />
              </div>

              <div className="overlay">
                <div className="the-blog-contents">
                  <h2>Title</h2>
                  <p>Author</p>
                  <p>DD/MM/YYYY - TIME</p>
                  <button>Read post</button>
                </div>
              </div>
            </div>
            <div className="blog-wrapper">
              <img
                src="https://images.pexels.com/photos/2528118/pexels-photo-2528118.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="blog-image"
              />

              <div className="server-action">
                <i className="pi pi-pencil" />
                <i className="pi pi-trash" />
              </div>

              <div className="overlay">
                <div className="the-blog-contents">
                  <h2>Title</h2>
                  <p>Author</p>
                  <p>DD/MM/YYYY - TIME</p>
                  <button>Read post</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="new-blog-post"
              element={<NewPost />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};
