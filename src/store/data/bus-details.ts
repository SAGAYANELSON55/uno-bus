import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Bus, Buses } from "@/models/bus-data";

const busDetails = createSlice({
  name: "Bus-details",
  initialState: {
    busData: null as Buses | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Buses>) => {
        state.loading = false;
        state.busData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error fetching data";
      });
  },
});

export const fetchData = createAsyncThunk<Buses, void>(
  "Bus-details/fetchData",
  async () => {
    try {
      const response = await fetch("api/busData/busdetails");
      const data = await response.json();
      return data as Buses;
    } catch (error) {
      throw Error("Failed to fetch data");
    }
  }
);

export const busActions = busDetails.actions;

export default busDetails.reducer;
