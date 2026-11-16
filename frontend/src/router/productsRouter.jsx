import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const ProductsIndex = lazy(() => import("../pages/products/IndexPage"));
const ProductsList = lazy(() => import("../pages/products/ListPage"));
const ProductsAdd = lazy(() => import("../pages/products/AddPage"));
const ProductRead = lazy(() => import("../pages/products/ReadPage"));
const ProductModify = lazy(() => import("../pages/products/ModifyPage"));

const Loading = () => <div>Products Loading....</div>;

export default function productsRouter() {
  return {
    path: "products",
    element: <Suspense fallback={<Loading/>}><ProductsIndex/></Suspense>,
    children: [
      {
        path: "list",
        element: <Suspense fallback={<Loading/>}><ProductsList/></Suspense>,
      },
      {
        path: "",
        element: <Navigate replace to="/products/list"/>,
      },
      {
        path: "add",
        element: <Suspense fallback={<Loading/>}><ProductsAdd/></Suspense>,
      },
      {
        path: "read/:pno",
        element: <Suspense fallback={<Loading/>}><ProductRead/></Suspense>,
      },
      {
        path: "modify/:pno",
        element: <Suspense fallback={<Loading/>}><ProductModify/></Suspense>,
      },
    ],
  };
}
