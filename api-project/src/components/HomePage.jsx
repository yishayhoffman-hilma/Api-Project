import { Link, Routes, Route, Outlet } from "react-router";
import "../css/homePage.css";
import {} from "react";
function HomePage() {
  function logOut() {
    localStorage.setItem("current-user", "");
    // nav("/login", { replace: true });
    console.log("logged out");
  }

  return (
    <>
      <nav>
        <Link className="nav-links" onClick={logOut} to={"/login"}>
          logout
        </Link>
        <Link className="nav-links" to={"/albums"}>
          albums
        </Link>
        <Link className="nav-links" to={"/posts"}>
          posts
        </Link>
        <Link className="nav-links" to={"/todos"}>
          todos
        </Link>
        <Link className="nav-links" to={"info"}>
          info
        </Link>
        <h1>Hello {JSON.parse(localStorage.getItem("current-user")).name}</h1>
      </nav>
      <Outlet />
    </>
  );
}

export default HomePage;
