import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { Seat } from "../../models/bus-data";

const initialState: Seat[] = [];

const seatLog = createSlice({
  name: "seat-log",
  initialState: initialState,
  reducers: {
    addSeat(state, action: PayloadAction<Seat>) {
      state.push(action.payload);
    },
    removeSeat(state, action: PayloadAction<string>) {
      state.filter((seat) => seat.seatNumber !== action.payload);
    },
  },
});

export const setSeatLog = seatLog.actions;

export default seatLog.reducer;
