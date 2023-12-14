import { Seat, SeatLog } from "@/models/bus-data";
import React from "react";
import style from "./confirm-form.module.css";

const PassengerTable: React.FC<{ seat: Seat | SeatLog; index: number }> = ({
  seat,
  index,
}) => {
  return (
    <tr key={seat.seatNumber} className={style.detail}>
      <td>{index + 1}</td>
      <td>{seat.name}</td>
      <td>{seat.age}</td>
      <td>{seat.gender}</td>
      <td>{seat.seatNumber}</td>
    </tr>
  );
};

export default PassengerTable;
