import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </GoogleOAuthProvider>
);
