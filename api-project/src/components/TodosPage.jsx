import { useEffect, useState } from "react";
import Todo from "./Todo";

function TodosPage() {
  const [todoData, settodoData] = useState([]);
  const [myInput, setmyInput] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("current-user"));
  const [sortMethod, setSortMethod] = useState("&_sort=id");

  useEffect(() => {
    async function getData() {
      const url =
        `http://localhost:3500/todos?userId=${userDetails.userId}` + sortMethod;
      console.log(url);

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
  }, [userDetails.userId, sortMethod]);

  function addTodo() {
    const myPackage = {
      userId: userDetails.userId,
      id: uuidv4(),
      title: myInput,
      completed: false,
    };
    fetch("http://localhost:3500/todos", {
      method: "POST",
      body: JSON.stringify(myPackage),
    });
    settodoData((prev) => {
      console.log(prev);
      console.log(myPackage);

      return [...prev, myPackage];
    });
    setmyInput("");
  }

  return (
    <>
      <h2>todos</h2>

      <div>add todo:</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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

      <div>choose sort method</div>
      <select
        onChange={(event) => {
          console.log(event.target.value);

          setSortMethod(event.target.value);
        }}
      >
        <option value="&_sort=id">id</option>
        <option value="&_sort=title">alphabetical</option>
      </select>

      {todoData.map((value, index) => {
        return (
          <Todo
            settodoData={settodoData}
            key={value.id}
            id={value.id}
            title={value.title}
            index={index}
            completed={value.completed}
          />
        );
      })}
    </>
  );
}

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4))).toString(
      16
    )
  );
}

export default TodosPage;
