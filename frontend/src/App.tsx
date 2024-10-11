import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import root from "./router/root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={root} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
