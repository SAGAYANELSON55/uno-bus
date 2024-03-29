import React, { useState } from "react";
import style from "./payment.module.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import PassengerTable from "../buses-layout/passenger-detail/confirm/confirm-form";
import { Alert, Snackbar } from "@mui/material";
import { busActions } from "@/store/data/bus-details";

const Payment = () => {
  const router = useRouter();
  const busNo = router.query.busno && router.query.busno.toString();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const buses = useSelector((state: RootState) => state.busData.busData.buses);
  const seats = useSelector((state: RootState) => state.seatLog.seats);

  if (!busNo) {
    return (
      <div className={style.loader}>
        <CircularProgress />
      </div>
    );
  }

  if (seats.length === 0) {
    router.replace("/");
  }

  const bus = buses.filter((bus) => bus.busNo === busNo)[0];
  function notify() {
    setLoading(true);
    dispatch(busActions.modifybus({ busno: bus.busNo, seats: seats }));

    setOpen(true);

    // router.push("/buses/booking");
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    router.replace("/payment/verification");
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
            Payment successfull
          </Alert>
        </Snackbar>
      )}
      {loading && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      {!loading && (
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
                <PassengerTable
                  key={seat.seatNumber}
                  seat={seat}
                  index={index}
                />
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
            <button className={style.paybutton} onClick={notify}>
              Pay
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Payment;
