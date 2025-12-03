import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatreducer from "./slices/chatSlice";
import loginreducer from "./slices/loginSlice";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const persistConfig = {
  key: "root",
  storage,
};

// Define your app's reducers
const appReducers = combineReducers({
  login: loginreducer,
  chat: chatreducer,
  // Add more reducers here if needed
});

// Define the root reducer that handles logout
const rootReducer = (state, action) => {
  if (action.type === "data/setLogOut") {
    state = undefined;
  }
  return appReducers(state, action);
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createStateSyncMiddleware({
        // Specify configuration here
        blacklist: ["persist/PERSIST"], // Ignore specified actions
      })
    ),
});

// Initialize message listener
initMessageListener(store);

export default store;
