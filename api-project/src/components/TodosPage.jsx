import { useEffect, useState } from "react";
import TodoList from "./TodoList";

function TodosPage() {
  const [todoData, settodoData] = useState([]);

  useEffect(() => {
    async function getData() {
      const userDetails = JSON.parse(localStorage.getItem("current-user"));
      const url = "http://localhost:3500/todos";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        await result.map((value) => {
          if (value.userId == userDetails.userId) {
            settodoData((prev) => {
              return [...prev, value];
            });
          }
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    getData();
  }, []);

  console.log(todoData);
  return (
    <>
      <h2>todos</h2>
      <TodoList data={todoData} />
    </>
  );
}

export default TodosPage;
