import { Provider } from "react-redux";
import { store } from "./store/store";
import QueryProvider from "./providers/QueryProvider";
import AppRouter from "./router/AppRouter";
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </Provider>
  );
};

export default App;
