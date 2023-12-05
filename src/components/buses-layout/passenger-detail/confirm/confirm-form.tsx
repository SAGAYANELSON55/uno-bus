import { Seat } from "@/models/bus-data";
import React from "react";

const PassengerTable: React.FC<{ seat: Seat; index: number }> = ({
  seat,
  index,
}) => {
  return (
    <tr key={seat.seatNumber}>
      <td>{index + 1}</td>
      <td>{seat.name}</td>
      <td>{seat.age}</td>
      <td>{seat.gender}</td>
      <td>{seat.seatNumber}</td>
    </tr>
  );
};

export default PassengerTable;
