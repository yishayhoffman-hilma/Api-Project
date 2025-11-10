import { Link, Routes, Route, Outlet } from "react-router";
import "../css/homePage.css";
function HomePage() {
  localStorage.setItem("current-user", "bob");

  return (
    <>
      <nav>
        <Link className="nav-links" to={""}>
          logout
        </Link>
        <Link className="nav-links" to={"albums"}>
          albums
        </Link>
        <Link className="nav-links" to={"posts"}>
          posts
        </Link>
        <Link className="nav-links" to={"todos"}>
          todos
        </Link>
        <Link className="nav-links" to={"info"}>
          info
        </Link>
        <h1>Hello {localStorage.getItem("current-user")}</h1>
      </nav>
      <Outlet />
    </>
  );
}

export default HomePage;
