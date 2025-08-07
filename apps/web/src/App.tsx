import { Provider } from "react-redux";
import { store } from "./store/store";
import QueryProvider from "./providers/QueryProvider";
import Auth0ProviderWrapper from "./providers/Auth0Provider";
import AppRouter from "./router/AppRouter";
import "./index.css";

const App = () => {
  return (
    <Auth0ProviderWrapper>
      <Provider store={store}>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </Provider>
    </Auth0ProviderWrapper>
  );
};

export default App;
