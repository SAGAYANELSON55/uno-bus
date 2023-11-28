import React, { useState } from "react";
import style from "./seat.module.css";
import { Seat } from "@/models/bus-data";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const Seats: React.FC<{ data: Seat }> = ({ data }) => {
  const [select, setSelect] = useState(false);
  const seatData = useSelector((state: RootState) => state.seatLog);
  const seatType = data.seatType.split("-")[0];

  const dispatch: AppDispatch = useDispatch();

  function bookingHandler() {
    setSelect((prev) => {
      console.log(!prev);
      return !prev;
    });
  }
  //   console.log(select);
  //   if (select) {
  //     dispatch(
  //       setSeatLog.addSeat({
  //         seatNumber: data.seatNumber,
  //         seatType: data.seatType,
  //         price: data.price,
  //         booked: data.booked,
  //       })
  //     );
  //   }
  //   if (!select) {
  //     dispatch(setSeatLog.removeSeat(data.seatNumber));
  //   }
  //   console.log(seatData);

  return (
    <>
      {seatType === "seater" && (
        <div
          className={`${style.seat} ${
            data.booked ? style.booked : data.seatConstraint ? style.locked : ""
          } ${data.gender === "female" ? style.female : ""} ${
            data.seatConstraint
          }`}
          onClick={bookingHandler}
        >
          {data.seatNumber}
        </div>
      )}

      {seatType === "Sleeper" && (
        <div
          className={`${style.sleeper} ${
            data.booked ? style.booked : data.seatConstraint ? style.locked : ""
          } ${data.gender === "female" ? style.female : ""} ${
            data.seatConstraint
          } `}
          onClick={bookingHandler}
        >
          {data.seatNumber}
        </div>
      )}
    </>
  );
};

export default Seats;
