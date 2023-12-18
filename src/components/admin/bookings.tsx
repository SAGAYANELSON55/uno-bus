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
import Loader from "../layout/loader";
import { Snackbar, Alert } from "@mui/material";

const Bookinglogs = () => {
  const [booking, setBooking] = useState([]);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const busData = useSelector((state: RootState) => state.busData.busData);

  const search = router.query.busno && router.query.busno.toString();
  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await fetch("/api/admin/fetchbooking");
        const res = await data.json();
        setLoader(false);
        setBooking(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBookings();
    dispatch(fetchData());
  }, [dispatch]);

  let log: BookingLog[];

  const updateBusData = async (busno: string) => {
    setOpen(true);
    await loadData(busData, busno);
    log = booking.filter((log) => log.busNo === search);
  };

  if (booking.length !== 0) {
    log = booking.filter((log) => log.busNo === search);
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={close}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={close} severity="success" sx={{ width: "100%" }}>
            booking deleted successfully!!
          </Alert>
        </Snackbar>
      )}
      {((search && !log) || (log && log.length === 0)) && !loader && (
        <p className={style.error}>No Bookings</p>
      )}
      {loader && <Loader />}
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
