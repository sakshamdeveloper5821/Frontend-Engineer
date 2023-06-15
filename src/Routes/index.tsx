
import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/Login";
import TodoList from "../pages/Todo";

export default createBrowserRouter([
    {path: "/" , element: <SignIn/>},
    {path: "/todo-list", element: <TodoList/>}
]);
