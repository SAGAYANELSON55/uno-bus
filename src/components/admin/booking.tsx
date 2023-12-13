import { BookingLog } from "@/models/bus-data";
import React from "react";
import style from "./booking.module.css";

const Bookinglog: React.FC<{ log: BookingLog }> = ({ log }) => {
  const date = log.timestamp.split("@");
  //working in progress....
  return (
    <div className={style.container}>
      <div className={style.details}>
        <div className={style.busno}>{`BusNo : ${log.busNo}`}</div>
        <div>{`Date : ${date[0]}`}</div>
        <div>{`Time: ${date[1]}`}</div>
      </div>
    </div>
  );
};

export default Bookinglog;
