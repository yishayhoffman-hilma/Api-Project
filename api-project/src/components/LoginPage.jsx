import { useState } from "react";
import { useNavigate } from "react-router";

// import "./App.css";

function LoginPage() {
  //   const [user, setUser] = useState("");
  const [valueUser, setValueUser] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [erorr, setErorr] = useState("");

  const nav = useNavigate();
  function handleUserChange(e) {
    setValueUser(e.target.value);
  }
  function handlePasswordChange(e) {
    setValuePassword(e.target.value);
  }
  function checkPassword(data) {
    if (valuePassword === data.website) {
      console.log("login sucsseusful");
      localStorage.setItem(
        "current-user",
        JSON.stringify({
          name: valueUser,
          userId: data.id,
        })
      );
      nav("/home", { replace: true });
    } else {
      console.log("wrong password");
      setErorr("login failed");

      //   return <h3 style={{ color: "red" }}>{erorr}</h3>;
    }
    return 0;
  }

  function handleSubmit(e, valueUser) {
    e.preventDefault();
    fetch(`http://localhost:3500/users?username=${valueUser}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((user) => {
        console.log(user[0].username);

        if (user[0].username) {
          console.log("user ex");
          console.log(user[0].id);
          console.log(user[0].username);
          checkPassword(user[0]);
        } else {
          console.log("user does not exist");
          setErorr("login failed");
        }
      });
  }
  function toRegister() {
    nav("/register");
  }
  return (
    <>
      <button onClick={toRegister}>Register</button>
      <h1>Login:</h1>
      <form onSubmit={(e) => handleSubmit(e, valueUser)}>
        <label>
          User name:
          <input type="text" onChange={handleUserChange} value={valueUser} />
        </label>
        <br />
        <br />
        <label>
          Password:
          <input
            type="password"
            onChange={handlePasswordChange}
            value={valuePassword}
          />
        </label>
        <br />
        <input type="submit" />
      </form>
      <h3 style={{ color: "red" }}>{erorr}</h3>
    </>
  );
}

export default LoginPage;
