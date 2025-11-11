import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
function PostsPage() {
  const [posts, setPosts] = useState([]);
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

  return (
    <>
      <h2>your posts:</h2>
      {posts.map((post, index) => {
        return (
          <>
            <Link to={`post/${currentUserName}/${post.id}`} index={index}>
              {post.title}
            </Link>

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
