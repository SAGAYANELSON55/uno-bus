import { BookingLog } from "@/models/bus-data";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "./bookings.module.css";
import Bookinglog from "./booking";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { fetchData } from "@/store/data/bus-details";
import { loadData } from "../payment/paymentcompleted";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Bookinglogs = () => {
  const [booking, setBooking] = useState([]);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const busData = useSelector((state: RootState) => state.busData.busData);

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
    dispatch(fetchData());
  }, [dispatch]);

  const updateBusData = (busno: string) => {
    loadData(busData, busno);
  };

  const log: BookingLog[] = booking.filter((log) => log.busNo === search);

  //Need attention in rendering
  return (
    <>
      {search && log.length === 0 && <p className={style.error}>No Bookings</p>}
      {log && log.length !== 0 && (
        <div className={style.container}>
          {log.map((book) => (
            <Bookinglog key={book.uid} log={book} update={updateBusData} />
          ))}
        </div>
      )}
    </>
  );
};

export default Bookinglogs;
