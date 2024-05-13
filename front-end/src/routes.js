import React from "react";
import { Route, Routes } from "react-router-dom";


import Home from "./containers/Home";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import TasksList from "./containers/TasksList";
import Signup from "./containers/Signup";
//import Profile from "./containers/Profile";

const BaseRouter = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/logout" element={<Logout />} />
    <Route exact path="/signup" element={<Signup />} />
    <Route exact path="/tasks" element={<TasksList />} />
  </Routes>
);

export default BaseRouter;