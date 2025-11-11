import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
function PostsPage() {
  const [posts, setPosts] = useState([]);
  //   const
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  const userId = currentUser.userId;
  const currentUserName = currentUser.name;
  //   console.log(currentUser);
  //   console.log(userId);

  useEffect(() => {
    fetch(`http://localhost:3500/posts?userId=${userId}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        // console.log(posts);
      });
  }, []);
  function handleChange(value) {
    fetch(`http://localhost:3500/posts?title=${value}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
        // console.log(posts);
      });
  }

  async function deletePost(url) {
    fetch(url, { method: "DELETE" }).response.json();

    // try {
    // const response = await fetch(url, {
    //   method: "DELETE",
    // });

    // const result = await response.json();
    // console.log("Delete successful:", result);
    // }
    //  catch (error) {
    //   console.error("Error deleting data:", error);
    // }
    setPosts((prev) => {
      return [...prev].filter((index) => {
        return index !== index;
      });
    });
  }

  return (
    <>
      {/* <label>
        <input
          type="text"
          onChange={handleChange}
          value={(e) => {
            e.target.value;
          }}
        />
      </label> */}
      <h2>your posts:</h2>
      {posts.map((post, index) => {
        return (
          <>
            <Link to={`post/${currentUserName}/${post.id}`} index={index}>
              {post.title}
            </Link>
            <button
              onClick={() => {
                deletePost(`http://localhost:3500/home/posts/${post.id}`);
              }}
            >
              delete
            </button>

            <br />
            <br />
          </>
        );
      })}
      <Outlet />
    </>
  );
}
export default PostsPage;
