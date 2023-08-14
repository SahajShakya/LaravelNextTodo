import {createBrowserRouter, Navigate} from "react-router-dom";

import Todo from "./components/Todo.jsx";
const route =  createBrowserRouter([
    {
        path: "/",
        element: <Todo />,
    },

])

export  default route;
