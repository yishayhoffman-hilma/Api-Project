import { Fragment, useEffect, useState } from "react";
import PostsPage from "./PostsPage";
import { useParams } from "react-router";
function Post(props) {
  const { postId } = useParams();

  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3500/posts/${postId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((post) => {
        setPostBody(post.body);
        setPostTitle(post.title);
      });
    fetch(`http://localhost:3500/comments?postId=${postId}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      });
  }, [postId]);

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
