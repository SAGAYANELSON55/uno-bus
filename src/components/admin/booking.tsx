import { BookingLog } from "@/models/bus-data";
import React, { useEffect, useState } from "react";
import style from "./booking.module.css";
import { TableBody, TableHead } from "@mui/material";
import PassengerTable from "../buses-layout/passenger-detail/confirm/confirm-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { busActions } from "@/store/data/bus-details";

const Bookinglog: React.FC<{
  log: BookingLog;
  update: (busno: string) => void;
}> = ({ log, update }) => {
  const [booking, setBooking] = useState(log);
  const [view, setView] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const busData = useSelector(
    (state: RootState) => state.busData.busData.buses
  );
  const date = booking?.timestamp.split("@");
  const bus = busData.filter((bus) => bus.busNo === log.busNo);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetch("/api/busData/updatebusdetails", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bus),
        });

        if (!data.ok) {
          const response = await data.json();
          throw new Error(response.error);
        }

        const result = await data.json();
        console.log(2);
      } catch (error) {
        console.error(error);
      }
    }
    if (!booking) {
      loadData();
    }
  }, [bus, booking]);

  function viewHandler() {
    setView((prev) => !prev);
  }

  async function deleteHandler() {
    setBooking(null);
    const data = await fetch("/api/admin/fetchbooking", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });
    if (booking) {
      dispatch(
        busActions.deletebooking({
          busno: booking.busNo,
          seats: booking.bookedSeats,
        })
      );
    }
    update(booking.busNo);
  }

  return (
    <>
      {booking && (
        <div className={style.container}>
          <div className={style.wrapper}>
            <div className={style.details}>
              <div className={style.busno}>{`BusNo : ${booking.busNo}`}</div>
              <div>{`Date : ${date[0]}`}</div>
              <div>{`Time: ${date[1]}`}</div>
              <div className={style.status}>{`status : ${booking.status}`}</div>
            </div>
            <div className={style.actions}>
              <button onClick={deleteHandler}>Delete Booking</button>
            </div>
          </div>
          {view && (
            <div className={style.detailsTable}>
              <table>
                <TableHead className={style["table-header"]}>
                  <tr>
                    <th className={style.sno}>S.No</th>
                    <th className={style.name}>Name</th>
                    <th className={style.Age}>Age</th>
                    <th className={style.gender}>Gender</th>
                    <th className={style.seatno}>SeatNo</th>
                  </tr>
                </TableHead>
                <TableBody>
                  {booking.bookedSeats.map((seat, index) => (
                    <PassengerTable
                      key={seat.seatNumber}
                      seat={seat}
                      index={index}
                    />
                  ))}
                </TableBody>
              </table>
            </div>
          )}
          <div className={style.view}>
            <button onClick={viewHandler}>View Booking</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookinglog;
