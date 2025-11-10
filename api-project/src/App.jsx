import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/posts"></Route>
          <Route path="/albums"></Route>
          <Route path="/todos"></Route>
          <Route path="/photos"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
