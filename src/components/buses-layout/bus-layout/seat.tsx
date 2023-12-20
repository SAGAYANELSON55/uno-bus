import React, { useCallback, useState } from "react";
import style from "./seat.module.css";
import { Seat } from "@/models/bus-data";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useSession } from "next-auth/react";

const Seats: React.FC<{ data: Seat }> = React.memo(function Item({ data }) {
  const [select, setSelect] = useState(false);
  const { data: session, status } = useSession();
  const seats = useSelector((state: RootState) => state.seatLog.seats);
  const seatType = data.seatType.split("-")[0];

  const dispatch: AppDispatch = useDispatch();

  const mode = session?.user?.name;
  const bookingHandler = useCallback(() => {
    if (mode === "Admin") {
      return;
    }

    if (seats.length !== 5 && !data.booked) {
      setSelect((prev) => {
        return !prev;
      });

      if (!select) {
        dispatch(
          setSeatLog.addSeat({
            seatNumber: data.seatNumber,
            seatType: data.seatType,
            price: data.price,
            booked: true,
            seatConstraint: data.seatConstraint,
          })
        );
      }
    }
    if (select) {
      setSelect(false);
      dispatch(setSeatLog.removeSeat(data.seatNumber));
    }
  }, [data, dispatch, select, seats, mode]);

  const cssClass = `${seatType === "seater" ? style.seat : style.sleeper} ${
    select && !data.booked ? style.selected : 0
  } ${data.booked ? style.booked : data.seatConstraint ? style.locked : ""} ${
    data.gender === "female" ? style.female : ""
  } ${data.seatConstraint}`;

  return (
    <div>
      <div
        className={cssClass}
        key={data.seatNumber}
        id={data.seatNumber}
        onClick={bookingHandler}
      >
        {data.seatNumber}
      </div>
      <div className={style.price}>{`₨ ${data.price}`}</div>
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
