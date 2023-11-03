import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";


const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

);

reportWebVitals();