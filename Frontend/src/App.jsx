import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home";
import Read from "./Component/Read";
import Edit from "./Component/Edit";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Read/>,
  },
  {
    path: "/home", 
    element: <Home />,
  },
  {
    path: "edit/:id",
    element: <Edit />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
