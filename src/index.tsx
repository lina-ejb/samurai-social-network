import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App } from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>

);

reportWebVitals();