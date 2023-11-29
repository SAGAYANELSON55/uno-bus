import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { SelectedSeat, Seat } from "../../models/bus-data";

const initialState: SelectedSeat = {
  seats: [],
};

const seatLog = createSlice({
  name: "seat-log",
  initialState: initialState,
  reducers: {
    addSeat(state, action: PayloadAction<Seat>) {
      if (state.seats.length !== 5) {
        state.seats.push(action.payload);
      }
    },
    removeSeat(state, action: PayloadAction<string>) {
      state.seats = state.seats.filter(
        (seat) => seat.seatNumber !== action.payload
      );
    },
  },
});

export const setSeatLog = seatLog.actions;

export default seatLog.reducer;
