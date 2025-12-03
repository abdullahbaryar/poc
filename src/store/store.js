import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

import authReducer from "./slices/authSlice";
import ledgerReducer from "./slices/ledgerSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  ledger: ledgerReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist login state only
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
