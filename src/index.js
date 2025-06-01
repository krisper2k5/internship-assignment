import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import "./scss/app.scss";
import countryReducer from "./features/countrySlice";
import { countryApi } from "./services/countryApi";
import "./i18n";

const store = configureStore({
  reducer: {
    country: countryReducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countryApi.middleware),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
