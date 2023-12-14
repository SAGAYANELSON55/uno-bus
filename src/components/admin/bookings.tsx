import { BookingLog } from "@/models/bus-data";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./bookings.module.css";
import { CircularProgress } from "@mui/material";
import Bookinglog from "./booking";

const Bookinglogs = () => {
  const [booking, setBooking] = useState([]);
  const router = useRouter();

  const search = router.query.busno && router.query.busno.toString();
  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await fetch("/api/admin/fetchbooking");
        const res = await data.json();
        setBooking(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookings();
  }, []);

  const log: BookingLog[] = booking.filter((log) => log.busNo === search);

  return (
    <>
      {search && log.length === 0 && <p className={style.error}>No Bookings</p>}
      {log && log.length !== 0 && (
        <div className={style.conatiner}>
          {log.map((book) => (
            <Bookinglog key={book.uid} log={book} />
          ))}
        </div>
      )}
    </>
  );
};

export default Bookinglogs;
