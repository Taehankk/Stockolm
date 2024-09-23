import { RouterProvider } from "react-router-dom";
import "./App.css";
import root from "./router/root";

function App() {
  return (
    <div className="w-[90vw] mx-auto my-0">
      <RouterProvider router={root} />
    </div>
  );
}

export default App;
