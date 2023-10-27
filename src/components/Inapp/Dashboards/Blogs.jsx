import React, { useEffect, useState } from "react";
import "../../../Style/Inapp.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import NewPost from "./NewPost";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Cookie from "js-cookie";

export const Blogs = () => {
  const [postedBlogs, setPostedBlogs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const pathName = location.pathname === "/admin-panel/blogs";

  const screenSize = window.innerWidth;

  const jwtToken = Cookie.get("jwt");

  useEffect(() => {
    const getAllBlogs = async () => {
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
        console.log(error);
      }
    };

    getAllBlogs();
  });

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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
            {postedBlogs
              .filter((blogs) =>
                searchValue.toLowerCase() === ""
                  ? blogs
                  : blogs.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
              .map((blogs, index) => (
                <div
                  key={index}
                  className="blog-wrapper"
                >
                  <img
                    src={blogs.image}
                    alt="blog-image"
                  />

                  <div className="server-action">
                    <i className="pi pi-pencil" />
                    <i className="pi pi-trash" />
                  </div>

                  <div className="overlay">
                    <div className="the-blog-contents">
                      <h2>{blogs.title}</h2>
                      <p>{blogs.author}</p>
                      <p>{blogs.createdOn}</p>
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
              element={<NewPost />}
            />
          </Routes>
        )}
      </div>
    </div>
  );
};
