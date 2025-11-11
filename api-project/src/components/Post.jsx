import { Fragment, useEffect, useState } from "react";
import PostsPage from "./PostsPage";
import { useParams } from "react-router";
// import "./App.css";
function Post(props) {
  const { postId, userName } = useParams();
  //   const { user } = useParams();

  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3500/posts/${postId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((post) => {
        // console.log(post);
        setPostBody(post.body);
        setPostTitle(post.title);
      });
    fetch(`http://localhost:3500/comments?postId=${postId}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  });

  return (
    <Fragment key={props.index}>
      <h2>{postTitle}</h2>
      <p className="post">{postBody}</p>
      {comments.map((comment) => {
        return (
          <>
            <h5>{comment.body}</h5>
            <h6 style={{ fontStyle: "italic" }}>by: {comment.name}</h6>
          </>
        );
      })}
    </Fragment>
  );
}
export default Post;
