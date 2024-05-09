import Provider from "./context/Provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QuestionView, Upsert } from "./components";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuestionView />,
  },
  {
    path: "/add",
    element: <Upsert />,
  },
  {
    path: "/edit/:id",
    element: <Upsert />,
  },
]);

const App = () => {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
