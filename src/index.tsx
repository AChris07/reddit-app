import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Global, ThemeProvider } from "@emotion/react";
import App from "./app/App";
import store from "./app/store";
import globalStyles from "./index.styles";
import theme from "./theme";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
