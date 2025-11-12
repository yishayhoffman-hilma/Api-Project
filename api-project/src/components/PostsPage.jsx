import { Fragment, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [myInput, setmyInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("current-user"));
  const userId = currentUser.userId;
  const currentUserName = currentUser.name;

  useEffect(() => {
    fetch(`http://localhost:3500/posts?userId=${userId}`, { method: "GET" })
      .then((response) => response.json())
      .then((result) => {
        setPosts(result);
      });
  }, [userId]);

  async function deletePost(url, id) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete successful:", result);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setPosts((prev) => {
      const newPosts = [...prev].filter((value) => {
        return value.id !== id;
      });
      return newPosts;
    });
  }
  function addPost() {
    const myPackage = {
      userId: userId,
      title: myInput,
      body: bodyInput,
      id: uuidv4(),
    };
    fetch("http://localhost:3500/posts", {
      method: "POST",
      body: JSON.stringify(myPackage),
    });
    setPosts((prev) => {
      console.log(prev);
      console.log(myPackage);

      return [...prev, myPackage];
    });

    setmyInput("");
    setBodyInput("");
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost();
        }}
      >
        <label>
          Title:
          <input
            value={myInput}
            type="text"
            onChange={(event) => {
              setmyInput(event.target.value);
            }}
          />
          <br />
        </label>
        <label>
          content:
          <input
            value={bodyInput}
            type="text"
            onChange={(event) => {
              setBodyInput(event.target.value);
            }}
          />
          <br />
        </label>
        <input type="submit" value="add post"></input>
      </form>
      <h2>your posts:</h2>
      {posts.map((post, index) => {
        return (
          <Fragment key={index}>
            <Link to={`post/${currentUserName}/${post.id}`} index={index}>
              {post.title}
            </Link>
            <button
              onClick={() => {
                deletePost(`http://localhost:3500/posts/${post.id}`, post.id);
              }}
            >
              delete
            </button>

            <br />
            <br />
          </Fragment>
        );
      })}
      <Outlet />
    </>
  );
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );
}
export default PostsPage;
