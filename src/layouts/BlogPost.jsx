import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../Style/layout/BlogPost.css";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "short",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const BlogPost = () => {
  const { blogId } = useParams();
  const [readBlog, setReadBlog] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/blog-post/${blogId}`
        );

        const data = response.data.readABlog;
        setCurrentPostId(data._id);

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

    const showOtherPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/blog-post/other-blogs`
        );

        const data = response.data;
        setOtherPosts(data.allBlogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogPost();
    showOtherPosts();
  }, [blogId]);

  // list all blog beside
  const otherPostsExcludingCurrent = otherPosts.filter(
    (otherPost) => otherPost._id !== currentPostId
  );

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
              <p className="date">{formatDate(readBlog.createdOn)}</p>
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
      <div className="other-posts-container">
        <div className="steeve">
          <h3 className="text-f16">Other Posts</h3>
          {otherPostsExcludingCurrent.map((otherPost) => (
            <Link to={`/techalive/blog/${otherPost._id}`}>
              <div className="other-posts-wrapper">
                <div className="other-posts-content">
                  <h3>
                    {otherPost.title.length > 20
                      ? otherPost.title.slice(0, 20) + "..."
                      : otherPost.title}
                  </h3>
                  <p>{formatDate(otherPost.createdOn)}</p>
                </div>
                <div className="other-posts-img">
                  <img
                    src={otherPost.image}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
