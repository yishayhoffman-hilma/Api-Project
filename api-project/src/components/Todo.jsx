import { Fragment } from "react";

function TodoList(props) {
  async function deleteTodo(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });

      const result = await response.json();
      console.log("Delete successful:", result);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    props.settodoData((prev) => {
      return [...prev].filter((value, index) => {
        return index !== props.index;
      });
    });
  }

  return (
    <>
      <Fragment key={props.id}>
        <p>
          {props.id}
          {".\t"}
          {props.title}
        </p>
        <input
          type="checkbox"
          checked={props.completed}
          onChange={() => {
            props.settodoData((prev) => {
              return prev.map((todo, index) => {
                if (index === props.index) {
                  return {
                    ...todo,
                    completed: !todo.completed,
                  };
                }
                return todo;
              });
            });
          }}
        ></input>
        <button
          onClick={() => {
            deleteTodo(`http://localhost:3500/todos/${props.id}`);
          }}
        >
          delete
        </button>
      </Fragment>
    </>
  );
}

export default TodoList;
