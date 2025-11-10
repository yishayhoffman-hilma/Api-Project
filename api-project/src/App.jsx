import "./App.css";
import { Routes, Route, Link, Navigate, Outlet } from "react-router";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AlbumPage from "./components/AlbumPage";
import PostsPage from "./components/PostsPage";
import TodosPage from "./components/TodosPage";
import PhotosPage from "./components/PhotosPage";
import Info from "./components/Info";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/home" element={<HomePage />}>
          <Route path="info" element={<Info />}></Route>
        </Route>
        <Route path="/todos" element={<TodosPage />}></Route>
        <Route path="/albums" element={<AlbumPage />}></Route>
        <Route path="/posts" element={<PostsPage />}></Route>
        <Route path="/photos" element={<PhotosPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
