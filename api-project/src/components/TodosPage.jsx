import { useEffect, useState } from "react";
import TodoList from "./Todo";

function TodosPage() {
  const [todoData, settodoData] = useState([]);
  const [myInput, setmyInput] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("current-user"));

  useEffect(() => {
    async function getData() {
      const url = `http://localhost:3500/todos?userId=${userDetails.userId}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        settodoData(result);
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, [userDetails.userId]);

  function addTodo() {
    fetch("http://localhost:3500/todos", {
      method: "POST",
      body: JSON.stringify({
        userId: userDetails.userId,
        id: new Date(),
        title: myInput,
        completed: false,
      }),
    });
  }

  return (
    <>
      <h2>todos</h2>
      <form
        onSubmit={() => {
          // e.preventDefault();
          addTodo();
        }}
      >
        <input
          value={myInput}
          type="text"
          onChange={(event) => {
            setmyInput(event.target.value);
          }}
        />
        <input type="submit"></input>
      </form>
      <TodoList data={todoData} />
    </>
  );
}

export default TodosPage;
