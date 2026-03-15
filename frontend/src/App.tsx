import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Root, Home, Facial, Headspa, Lahes, Message, NotFound } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/facial",
        element: <Facial />,
      },
      {
        path: "/headspa",
        element: <Headspa />,
      },
      {
        path: "/lashes",
        element: <Lahes />,
      },
      {
        path: "/Message",
        element: <Message />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
