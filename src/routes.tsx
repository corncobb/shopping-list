import { Navigate } from "react-router-dom";
import { MainLayout } from "./layout/main-layout";
import { Home } from "./pages";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
];
