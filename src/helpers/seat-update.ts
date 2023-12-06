import { Bus, Seat } from "@/models/bus-data";

export function updateBusdata(busData: Bus, seats: Seat[]) {
  seats.map((seat) => {
    const match = seat.seatNumber.match(/R(\d+)(\d+)/);
    const rows = +match[1];
    const col = +match[2];
    const deck =
      rows === 1 || rows === 2 || rows === 3 ? "lowerDeck" : "upperDeck";
    const row =
      deck === "upperDeck"
        ? `row${rows === 4 ? 1 : rows === 5 ? 2 : rows === 6 ? 3 : 0}`
        : `row${rows}`;

    console.log(busData[`${deck}`][`${row}`][col - 1]);
    console.log(seat);
    busData[`${deck}`][`${row}`][col - 1] = seat;
    if (seat.gender === "female") {
      if (rows === 1 || rows === 2 || rows === 4 || rows === 5) {
        const adjrow =
          rows === 1 ? 2 : rows === 2 ? 1 : rows === 4 ? 5 : rows === 5 ? 4 : 0;
        busData[`${deck}`][`${adjrow}`][col - 1].seatConstraint = true;
      }
    }
  });
  return busData;
}
