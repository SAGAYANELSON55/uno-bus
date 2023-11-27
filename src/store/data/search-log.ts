import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { search } from "../../models/search-log";

const initialState: search = {
  source: "Chennai",
  destination: "Trichy",
};

const searchlog = createSlice({
  name: "search-log",
  initialState: initialState,
  reducers: {
    searchBus(state, action: PayloadAction<search>) {
      state.source = action.payload.source;
      state.destination = action.payload.destination;
    },
  },
});

export const setsearch = searchlog.actions;

export default searchlog.reducer;
