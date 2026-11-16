import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const TodoList = lazy(() => import("../pages/todo/ListPage"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage"));
const TodoAdd = lazy(() => import("../pages/todo/AddPage"));
const TodoModify = lazy(() => import("../pages/todo/ModifyPage"));

const Loading = () => <div>Todo Loading....</div>;

export default function todoRouter() {
  return {
    path: "todo",
    element: <Suspense fallback={<Loading/>}><TodoIndex/></Suspense>,
    children: [
      {
        path: "list",
        element: <Suspense fallback={<Loading/>}><TodoList/></Suspense>,
      },
      {
        path: "read/:tno",
        element: <Suspense fallback={<Loading/>}><TodoRead/></Suspense>,
      },
      {
        path: "add",
        element: <Suspense fallback={<Loading/>}><TodoAdd/></Suspense>,
      },
      {
        path: "modify/:tno",
        element: <Suspense fallback={<Loading/>}><TodoModify/></Suspense>,
      },
      {
        path: "",
        element: <Navigate to="/todo/list"/>,
      },
    ],
  };
}
