import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import Layout from "../layout/Layout";
import ProductsPage from "../pages/ProductsPage";
import AddProductsPage from "../pages/AddProductsPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/product",
        element: <ProductsPage />,
      },
      {
        path: "/addProduct",
        element: <AddProductsPage />,
      },
    ],
  },
  {
    path:"/register",
    element:<RegisterPage />
  },
  {
    path:"/login",
    element:<LoginPage />
  }
]);

export default router;
