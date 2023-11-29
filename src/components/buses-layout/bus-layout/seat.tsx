import React, { useCallback, useState } from "react";
import style from "./seat.module.css";
import { Seat } from "@/models/bus-data";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const Seats: React.FC<{ data: Seat }> = React.memo(function Item({ data }) {
  const [select, setSelect] = useState(false);
  const seats = useSelector((state: RootState) => state.seatLog.seats);
  const seatType = data.seatType.split("-")[0];

  const dispatch: AppDispatch = useDispatch();

  const bookingHandler = useCallback(() => {
    if (seats.length !== 5 && !data.booked) {
      setSelect((prev) => {
        return !prev;
      });
      console.log(seats.length);
      console.log(select);
      if (!select) {
        dispatch(
          setSeatLog.addSeat({
            seatNumber: data.seatNumber,
            seatType: data.seatType,
            price: data.price,
            booked: data.booked,
          })
        );
      }
    }
    if (select) {
      dispatch(setSeatLog.removeSeat(data.seatNumber));
    }
  }, [data, dispatch, select, seats]);

  const cssClass = `${seatType === "seater" ? style.seat : style.sleeper} ${
    select && !data.booked ? style.selected : 0
  } ${data.booked ? style.booked : data.seatConstraint ? style.locked : ""} ${
    data.gender === "female" ? style.female : ""
  } ${data.seatConstraint}`;

  return (
    <div
      className={cssClass}
      key={data.seatNumber}
      id={data.seatNumber}
      onClick={bookingHandler}
    >
      {data.seatNumber}
    </div>
  );
});

export default Seats;

{
  /* {seatType === "Sleeper" && (
        <div
          className={`${style.sleeper} ${
            data.booked ? style.booked : data.seatConstraint ? style.locked : ""
          } ${data.gender === "female" ? style.female : ""} ${
            data.seatConstraint
          } `}
          key={data.seatNumber}
          id={data.seatNumber}
          onClick={bookingHandler}
        >
          {data.seatNumber}
        </div>
      )} */
}
