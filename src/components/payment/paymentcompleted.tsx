import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { BookingLog } from "@/models/bus-data";
import { setSeatLog } from "@/store/data/seat-details";

const PaymentCompleted: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const busData = useSelector((state: RootState) => state.busData.busData);

  const seatData = useSelector((state: RootState) => state.seatLog);
  const busno = seatData.pathname.split("=")[1];
  const seats = seatData.seats;
  console.log(busno);
  const bus = busData.buses.filter((bus) => bus.busNo === busno);
  console.log(bus);

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

  console.log(timestamp);

  const router = useRouter();

  useEffect(() => {
    const bookingLog: BookingLog = {
      status: "successfull",
      timestamp: timestamp,
      uid: +new Date(),
      busNo: busno,
      bookedSeats: seats,
    };
    async function loadData() {
      try {
        const data = await fetch("api/busData/updatebusdetails", {
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
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    async function loadbooking() {
      try {
        const data = await fetch("api/bookinglog/bookingdetails", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingLog),
        });

        const response = data.json();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    loadbooking();
    loadData();
  });

  function homeLoader() {
    dispatch(setSeatLog.removepath());
    window.history.replaceState({}, "", "/");
    router.push("/");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2>Payment Completed</h2>
      <p style={{ paddingTop: "5px" }}>
        click here to navigate to the home page
      </p>
      <Button onClick={homeLoader} color="error">
        Home
      </Button>
    </div>
  );
};

export default PaymentCompleted;
