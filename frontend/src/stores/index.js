import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
//redux-logger
import thunk from "redux-thunk";

const middleware = [thunk];
export const storeRoot = configureStore(
  {
    reducer: {
    },
  },
  applyMiddleware(...middleware)
);
