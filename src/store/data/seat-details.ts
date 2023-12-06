import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { SelectedSeat, Seat } from "../../models/bus-data";

const initialState: SelectedSeat = {
  seats: [],
  pathname: "",
};

const seatLog = createSlice({
  name: "seat-log",
  initialState: initialState,
  reducers: {
    clearSeats(state) {
      state.seats = [];
    },
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
    addName(state, action: PayloadAction<{ name: string; index: number }>) {
      state.seats[action.payload.index].name = action.payload.name;
    },
    addAge(state, action: PayloadAction<{ age: string; index: number }>) {
      state.seats[action.payload.index].age = +action.payload.age;
    },
    addGender(state, action: PayloadAction<{ gender: string; index: number }>) {
      state.seats[action.payload.index].gender = action.payload.gender;
    },
    addpath(state, action: PayloadAction<{ path: string }>) {
      state.pathname = action.payload.path;
    },
    removepath(state) {
      state.pathname = "";
    },
  },
});

export const setSeatLog = seatLog.actions;

export default seatLog.reducer;
