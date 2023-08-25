import React from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import User from "./components/User";
import { CreateUser } from "./components/CreateUser";
import Login from "./components/Login";
import Edit from "./components/Edit";
import { Routes, Route } from "react-router-dom";
import Footercom from "./components/Footercom";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/Home" element={<Home />}></Route>
        <Route exact path="/User" element={<User />}></Route>
        <Route exact path="/CreateUser" element={<CreateUser />}></Route>
        <Route exact path="/edit" element={<Edit />}></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes>
      <Footercom />
    </>
  );
};
export default App;
