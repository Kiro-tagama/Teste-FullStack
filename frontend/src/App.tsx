import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./screens/Home"
import { Album } from "./screens/Album"

const router = createBrowserRouter([
  {path: "/", element: <Home/>},
  {path: "/album/:paramID", element: <Album/>},
]);

export default function App() {
  return (
    <div className="h-screen p-2 sm:p-5 flex justify-center items-center">
      <article className="max-w-[90vw] max-h-[85vh] h-full flex-1 p-2 sm:p-5 m-0 box-content">
      <RouterProvider router={router} />
      </article>
    </div>
  )
}