import { Fragment } from "react";

function TodoList(props) {
  function deleteTodo() {}

  return (
    <>
      {props.data.map((value) => {
        return (
          <Fragment key={value.id}>
            <p>
              {value.id}
              {".\t"}
              {value.title}
            </p>
            <input type="checkbox" checked={value.completed}></input>
            <button onClick={() => deleteTodo()}>delete</button>
          </Fragment>
        );
      })}
    </>
  );
}

export default TodoList;
