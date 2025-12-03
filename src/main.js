// src/main.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";

import { BrowserRouter } from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import store, { persistor } from "./store/store.js";

import { ReactQueryProvider } from "./providers/ReactQueryProvider.js";
import { Web3Provider } from "./providers/Web3Provider.js";
import ThemeProvider from "./theme/index.js";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <ThemeProvider>
            <Web3Provider>
              <BrowserRouter>
                <App />
                <Toaster position="top-right" reverseOrder={false} />
              </BrowserRouter>
            </Web3Provider>
          </ThemeProvider>
        </ReactQueryProvider>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
