
import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/Login";
import TodoList from "../pages/Todo";

export default createBrowserRouter([
    //LOGIN ROUTE
    {path: "/" , element: <SignIn/>},
    //TODO LIST ROUTE
    {path: "/todo-list", element: <TodoList/>}
]);
