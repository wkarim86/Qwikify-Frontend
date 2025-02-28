/**
 * Redux store configuration file
 */
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducer";
import { endPoints } from "./base.api";
import logger from "redux-logger";

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddlewares) => {
    return getDefaultMiddlewares({ serializableCheck: false }).concat(
      endPoints.middleware,
      logger
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
