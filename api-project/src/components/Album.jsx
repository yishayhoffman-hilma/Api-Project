import { Link } from "react-router";

function Album(props) {
  return (
    <>
      <h3>title:</h3>
      <Link to={`album/${props.value.id}`}>
        id:{props.value.id} {props.value.title}
      </Link>
    </>
  );
}

export default Album;
