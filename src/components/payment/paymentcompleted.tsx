import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { BookingLog, Buses } from "@/models/bus-data";
import { setSeatLog } from "@/store/data/seat-details";

export const loadData = async (busData: Buses, busno: string) => {
  try {
    const response = await fetch("/api/busData/updatebusdetails", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(busData.buses.filter((bus) => bus.busNo === busno)),
    });

    if (!response.ok) {
      throw new Error("Failed to update bus details");
    }

    const result = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const loadBooking = async (bookingLog: BookingLog) => {
  try {
    const response = await fetch("/api/bookinglog/bookingdetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingLog),
    });

    if (!response.ok) {
      throw new Error("Failed to log booking details");
    }

    const result = await response.json();
  } catch (error) {
    console.error(error);
  }
};

const PaymentCompleted: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const busData = useSelector((state: RootState) => state.busData.busData);
  const seatData = useSelector((state: RootState) => state.seatLog);
  const busno = seatData.pathname.split("=")[1];
  const seats = seatData.seats;

  const router = useRouter();

  if (busno && seats.length > 0) {
    const currentdate = new Date();
    const timestamp =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    const bookingLog: BookingLog = {
      status: "successful",
      timestamp: timestamp,
      uid: +new Date(),
      busNo: busno,
      bookedSeats: seats,
    };

    loadBooking(bookingLog);
    loadData(busData, busno);
    dispatch(setSeatLog.removepath());
  }

  function homeLoader() {
    router.push("/");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2>Payment Completed</h2>
      <p style={{ paddingTop: "5px" }}>
        Click here to navigate to the home page
      </p>
      <Button onClick={homeLoader} color="error">
        Home
      </Button>
    </div>
  );
};

export default PaymentCompleted;
