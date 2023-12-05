import { Seat, Bus } from "./bus-data";

export type SessionStartegy = "jwt";

export interface LoginProps {
  switch: () => void;
}

export interface SignupProps {
  switch: () => void;
}

export interface confirmProps {
  seats: Seat[];
  bus: Bus;
  onClose: () => void;
}

export interface userData {
  email: string;
  name: string;
  password: string;
}
