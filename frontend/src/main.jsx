import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./pages/App/App.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { UserForm } from "./pages/UserForm/UserForm.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import { Profile } from "./components/Profile/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "profile", element: <Profile /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <UserForm action="login" />,
  },
  {
    path: "/signup",
    element: <UserForm action="signup" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
