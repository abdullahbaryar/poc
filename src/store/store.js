import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";
import ledgerReducer from "./slices/ledgerSlice";

const combinedReducers = combineReducers({
  auth: authReducer,
  ledger: ledgerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist login state only
};

const rootReducer = (state, action) => {
  if (action.type === "data/setLogOut") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
