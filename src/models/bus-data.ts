export interface Seat {
  seatNumber: string;
  seatType: string;
  price: number;
  booked: boolean;
  name?: string;
  age?: number;
  gender?: string;
  seatConstraint?: boolean;
}

export interface search {
  source: string | null;
  destination: string | null;
}
export interface SelectedSeat {
  seats: Seat[];
  pathname: string;
}

export interface Buses {
  buses: Bus[];
  model: Bus;
}

export interface Bus {
  departureTime?: string;
  arrivalTime?: string;
  source?: string;
  destination?: string;
  busName: string;
  model?: string;
  lowerDeck: lowerDeck;
  upperDeck: UpperDeck;
  busNo: string;
  availSeats: number;
}

export interface SeatLog {
  seatNumber: string;
  name?: string;
  age?: number;
  gender?: string;
  seatConstraint?: boolean;
}

export interface BookingLog {
  status: string;
  timestamp: string;
  uid: number;
  busNo: string;
  name: string;
  bookedSeats: SeatLog[];
}

interface lowerDeck {
  row1: Seat[];
  row2: Seat[];
  row3: Seat[];
}

interface UpperDeck {
  row1: Seat[];
  row2: Seat[];
  row3: Seat[];
}
