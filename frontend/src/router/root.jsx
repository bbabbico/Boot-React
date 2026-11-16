import {lazy, Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";

const Loading = () => <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const About = lazy(() => import("../pages/AboutPage"));

const root = createBrowserRouter([
  {
    path: "/",
    Component: BasicLayout,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading/>}><Main/></Suspense>,
      },
      {
        path: "about",
        element: <Suspense fallback={<Loading/>}><About/></Suspense>,
      },
      todoRouter(),
      productsRouter(),
    ],
  },
]);

export default root;
