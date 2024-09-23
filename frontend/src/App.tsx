import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/root";

function App() {
  return (
    <div className="">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
