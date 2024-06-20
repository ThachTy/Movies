import { BrowserRouter } from "react-router-dom";
import Router from "@config/router";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "@config/redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </Provider >
  );
}

export default App;
