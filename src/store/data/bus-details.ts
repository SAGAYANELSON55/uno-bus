import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Bus, Buses, Seat, SeatLog } from "@/models/bus-data";

const busDetails = createSlice({
  name: "Bus-details",
  initialState: {
    busData: null as Buses | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    modifybus(state, action: PayloadAction<{ busno: String; seats: Seat[] }>) {
      state.busData.buses = state.busData.buses?.map((bus) => {
        if (bus.busNo === action.payload.busno) {
          const existingbus = bus;
          action.payload.seats.map((seat) => {
            const match = seat.seatNumber.match(/R(\d+)(\d+)/);
            const rows = +match[1];
            const col = +match[2];
            const deck =
              rows === 1 || rows === 2 || rows === 3
                ? "lowerDeck"
                : "upperDeck";
            const row =
              deck === "upperDeck"
                ? `row${rows === 4 ? 1 : rows === 5 ? 2 : rows === 6 ? 3 : 0}`
                : `row${rows}`;
            existingbus[`${deck}`][`${row}`][col - 1] = seat;
            if (seat.gender === "female") {
              if (rows === 1 || rows === 2 || rows === 4 || rows === 5) {
                const adjacentrow =
                  rows === 1
                    ? 2
                    : rows === 2
                    ? 1
                    : rows === 4
                    ? 5
                    : rows === 5
                    ? 4
                    : 0;
                const adjrow =
                  deck === "upperDeck"
                    ? `row${adjacentrow === 4 ? 1 : adjacentrow === 5 ? 2 : 0}`
                    : `row${adjacentrow}`;
                existingbus[`${deck}`][`${adjrow}`][col - 1].seatConstraint =
                  true;
              }
            }
          });
          existingbus.availSeats =
            existingbus.availSeats - action.payload.seats.length;

          return existingbus;
        }
        return bus;
      });
    },
    deletebooking(
      state,
      action: PayloadAction<{ busno: String; seats: SeatLog[] }>
    ) {
      state.busData.buses = state.busData.buses?.map((bus) => {
        if (bus.busNo === action.payload.busno) {
          const existingbus = bus;
          action.payload.seats.map((seat) => {
            const match = seat.seatNumber.match(/R(\d+)(\d+)/);
            const rows = +match[1];
            const col = +match[2];
            const deck =
              rows === 1 || rows === 2 || rows === 3
                ? "lowerDeck"
                : "upperDeck";
            const row =
              deck === "upperDeck"
                ? `row${rows === 4 ? 1 : rows === 5 ? 2 : rows === 6 ? 3 : 0}`
                : `row${rows}`;
            existingbus[`${deck}`][`${row}`][col - 1] = {
              ...existingbus[`${deck}`][`${row}`][col - 1],
              name: undefined,
              age: undefined,
              gender: undefined,
              booked: false,
            };
            if (seat.gender === "female") {
              if (rows === 1 || rows === 2 || rows === 4 || rows === 5) {
                const adjacentrow =
                  rows === 1
                    ? 2
                    : rows === 2
                    ? 1
                    : rows === 4
                    ? 5
                    : rows === 5
                    ? 4
                    : 0;
                const adjrow =
                  deck === "upperDeck"
                    ? `row${adjacentrow === 4 ? 1 : adjacentrow === 5 ? 2 : 0}`
                    : `row${adjacentrow}`;
                existingbus[`${deck}`][`${adjrow}`][col - 1].seatConstraint =
                  false;
              }
            }
          });
          existingbus.availSeats =
            existingbus.availSeats + action.payload.seats.length;

          return existingbus;
        }
        return bus;
      });
    },
    clearbus(state) {
      state = {
        busData: null as Buses | null,
        loading: false,
        error: null as string | null,
      };
    },
    deleteBus(state, action: PayloadAction<string>) {
      state.busData.buses = state.busData.buses.filter(
        (bus) => bus.busNo !== action.payload
      );
    },
  },
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
      console.log(data);
      return data as Buses;
    } catch (error) {
      throw Error("Failed to fetch data");
    }
  }
);

export const busActions = busDetails.actions;

export default busDetails.reducer;
