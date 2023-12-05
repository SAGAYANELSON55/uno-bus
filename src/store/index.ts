// import { configureStore } from "@reduxjs/toolkit";
// import busDetails from "./data/bus-details";
// import searchLog from "./data/search-log";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";

// const store = configureStore({
//   reducer: { busData: busDetails, searchlog: searchLog },
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import busDetails from "./data/bus-details";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "@/helpers/storage";

import seatLog from "./data/seat-details";

const combinedReducer = combineReducers({
  busData: busDetails,
  seatLog: seatLog,
});

typeof window != "undefined";
const persistConfig = {
  key: "busTicketBookingApp",
  storage,
  whitelist: ["busData"],
};

const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
