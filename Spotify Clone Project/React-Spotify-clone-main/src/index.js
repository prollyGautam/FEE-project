import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./utils/StateProvider";
import reducer, { initialState } from "./utils/Reducer";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  // <React.StrictMode>
  <>
    <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
    </BrowserRouter>
  {/* </React.StrictMode> */}
  </>,
  document.getElementById("root")
);
