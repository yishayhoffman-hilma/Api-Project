import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function RegisterPage() {
  const [valueUser, setValueUser] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const [valueVerifyPassword, setValueVerifyPassword] = useState("");
  const [erorr, setErorr] = useState("");
  const [status, setStatus] = useState(true);

  const nav = useNavigate();
  function handleUserChange(e) {
    setValueUser(e.target.value);
  }
  function handlePasswordChange(e) {
    setValuePassword(e.target.value);
  }
  function handleVerifyPasswordChange(e) {
    setValueVerifyPassword(e.target.value);
  }

  function checkPassword(data) {
    if (valuePassword === valueVerifyPassword) {
      console.log("register sucsseusful");

      fetch("http://localhost:3500/users", {
        method: "POST",
        body: JSON.stringify({
          username: valueUser,
          website: valuePassword,
          id: JSON.stringify(data.length + 1),
        }),
      });
      nav("/login", { replace: true });
    } else {
      console.log("passwords are not the same");
      setErorr("register failed");
    }
    return 0;
  }

  function handleSubmit(e, valueUser) {
    e.preventDefault();
    fetch("http://localhost:3500/users", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        const existingUser = data.find((user) => user.username === valueUser);
        if (existingUser) {
          console.log("user already exists");
          setErorr("user already exists");
          return;
        }
        checkPassword(data);
      });
  }

  return (
    <>
      <h1>register:</h1>
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
        <br />
        <label>
          Verify password:
          <input
            type="password"
            onChange={handleVerifyPasswordChange}
            value={valueVerifyPassword}
          />
          <br />
          <br />
        </label>
        <br />
        <input type="submit" />
      </form>
      <h3 style={{ color: "red" }}>{erorr}</h3>
    </>
  );
}

export default RegisterPage;
