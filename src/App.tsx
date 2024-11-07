import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as rootLoader } from "./routes/Root";
import Root from "./routes/Root";
import Contacts from "./routes/Contacts";
import Payment from "./routes/Payment";
import ErrorPage from "./routes/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    index: true,
    loader: rootLoader,
  },
  {
    path: "/contacts",
    element: <Contacts />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
    errorElement: <ErrorPage />,
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
