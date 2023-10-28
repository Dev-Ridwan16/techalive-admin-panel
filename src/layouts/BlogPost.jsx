import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Style/layout/BlogPost.css";

const BlogPost = () => {
  const { blogId } = useParams();
  const [readBlog, setReadBlog] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `https://techalive.onrender.com/api/v1/blog-post/${blogId}`
        );

        const data = response.data.readABlog;

        switch (response.status) {
          case 200:
            setReadBlog(data);
            console.log(data);
            break;
          default:
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  // list all blog beside

  return (
    <div className="readingBlog-container">
      <div className="blog-post-wrapper">
        {readBlog && (
          <div>
            <h1 className="blog-header">{readBlog.title}</h1>
            <div className="blog-det">
              <label htmlFor="">By:</label>
              <p className="author">{readBlog.author}</p>
            </div>
            <div className="blog-det">
              <label htmlFor="">Company:</label>
              <p className="company">{readBlog.company}</p>
            </div>
            <div className="blog-det">
              <label htmlFor="">Date:</label>
              <p className="date">{readBlog.createdOn}</p>
            </div>
            <img
              src={readBlog.image}
              alt=""
            />
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: readBlog.blog }}
            />
          </div>
        )}
      </div>
      <hr />
      <div></div>
    </div>
  );
};

export default BlogPost;
