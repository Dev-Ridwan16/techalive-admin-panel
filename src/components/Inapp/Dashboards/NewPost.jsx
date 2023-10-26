import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function NewPost() {
  const [disable, setDisable] = useState(true);
  const [editorValue, setEditorValue] = useState("");

  const [blogDetails, setBlogDetails] = useState({
    image: "",
    title: "",
    author: "",
  });

  const handleEditorValue = (value) => {
    setEditorValue(value);
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

  const handleSubmitBlog = () => {};

  return (
    <div className="new-post-container">
      <div className="blog-details-wrapper">
        <div className="blog-details">
          <div className="details">
            <div className="field">
              <input
                name="image"
                type="text"
                className="img-link"
                placeholder="Image Link"
                value={blogDetails.imgLink}
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
          Post blog
        </button>
      </div>
      <ReactQuill
        theme="snow"
        value={editorValue}
        onChange={handleEditorValue}
        className="react-quill-editor"
      />
    </div>
  );
}
