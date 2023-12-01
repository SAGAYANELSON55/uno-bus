import React from "react";
import style from "./confirm.module.css";
import { confirmProps } from "@/models/util";
import PassengerTable from "./confirm-form";
import { useRouter } from "next/router";

const Confirm: React.FC<confirmProps> = ({ seats, bus, onClose }) => {
  const router = useRouter();

  function paymentHandler() {
    router.replace({
      pathname: `/payment`,
      query: { busno: `${bus.busNo}` },
    });
  }
  return (
    <dialog className={style.container}>
      <div className={style.modal}>
        <div className={style.details}>
          <div className={style.wrapper}>
            <h2>{`Bus Name: ${bus.busName}`}</h2>
            <div className={style.detail}>
              <div className={style.col1}>
                <p>Bus No: {bus.busNo}</p>
                <p>Source: {bus.source}</p>
                <p>Destination: {bus.destination}</p>
              </div>
              <div className={style.col2}>
                <p>Departure Time: {bus.departureTime}</p>
                <p>Arrival Time: {bus.arrivalTime}</p>
                <p>Model: {bus.model}</p>
              </div>
            </div>
          </div>
        </div>
        <table>
          <thead>
            <tr className={style["table-header"]}>
              <th className={style.sno}>S.No</th>
              <th className={style.name}>Name</th>
              <th className={style.Age}>Age</th>
              <th className={style.gender}>Gender</th>
              <th className={style.seatno}>SeatNo</th>
            </tr>
          </thead>
          <tbody className={style.content}>
            {seats.map((seat, index) => (
              <PassengerTable key={seat.seatNumber} seat={seat} index={index} />
            ))}
          </tbody>
        </table>

        {seats.length !== 0 && (
          <p className={style.price}>
            {` Total Price: ₨
                ${seats.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.price;
                }, 0)}
                `}
          </p>
        )}
        <form method="dialog">
          <button className={style.paybutton} onClick={paymentHandler}>
            confirm
          </button>
          <button className={style.editbutton} onClick={() => onClose()}>
            Edit
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Confirm;
