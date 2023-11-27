import { configureStore } from "@reduxjs/toolkit";
import busDetails from "./data/bus-details";
import searchLog from "./data/search-log";

const store = configureStore({
  reducer: { busData: busDetails, searchlog: searchLog },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
