import { combineReducers, configureStore } from "@reduxjs/toolkit";

import contactReducer from "../redux/features/contactSlice";

const rootReducer = combineReducers({
  contact: contactReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
