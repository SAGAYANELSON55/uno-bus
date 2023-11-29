import React from "react";
import style from "./booking.module.css";
import Seatlayout from "./bus-layout/seat-layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Details from "./passenger-detail/details";
import { updateBusdata } from "@/helpers/seat-update";

const Booking = () => {
  const busData = useSelector((state: RootState) => state.busData.busData);
  const seatDetail = useSelector((state: RootState) => state.seatLog.seats);
  const router = useRouter();

  const search = router.query.busno && router.query.busno.toString();
  console.log(search);

  const buses =
    search &&
    busData !== null &&
    busData.buses.filter((bus) => bus.busNo === search);

  if (search && buses && buses.length === 0) {
    console.log("pagenot found");
    router.replace("404.tsx");
  }
  console.log(buses);
  if (!search && !buses) {
    return (
      <div className={style.loader}>
        <CircularProgress />
      </div>
    );
  }

  const data = buses[0];
  
  console.log(updateBusdata(data,seatDetail));

  return (
    <>
      {buses && buses.length !== 0 && (
        <div className={style.container}>
          <div className={style.seatlayout}>
            <Seatlayout busData={buses} />
          </div>
          <div className={style.detailslayout}>
            <div className={style.details}>
              <div className={style.wrapper}>
                <h2>{data.busName}</h2>
                <div className={style.detail}>
                  <div className={style.col1}>
                    <p>Bus No: {data.busNo}</p>
                    <p>Source: {data.source}</p>
                    <p>Destination: {data.destination}</p>
                  </div>
                  <div className={style.col2}>
                    <p>Departure Time: {data.departureTime}</p>
                    <p>Arrival Time: {data.arrivalTime}</p>
                    <p>Model: {data.model}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Details />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
