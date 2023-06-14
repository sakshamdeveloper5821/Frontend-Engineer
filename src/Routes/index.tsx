
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/Login/Login.page";
import TodoList from "../pages/Todo";

export default createBrowserRouter([
    {path: "/" , element: <SignIn/>},
    {path: "/todo-list", element: <TodoList/>}
]);
