import React, { useEffect } from "react";
import style from "./booking.module.css";
import Seatlayout from "./bus-layout/seat-layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Details from "./passenger-detail/details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { setSeatLog } from "@/store/data/seat-details";

const Booking = () => {
  const busData = useSelector((state: RootState) => state.busData.busData);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const search = router.query.busno && router.query.busno.toString();
  console.log(search);
  console.log(busData);

  const buses =
    search &&
    busData !== null &&
    busData.buses.filter((bus) => bus.busNo === search);

  useEffect(() => {
    dispatch(setSeatLog.clearSeats());
  }, [dispatch]);

  if (search && buses && buses.length === 0) {
    console.log("pagenot found");
    router.replace("404.tsx");
  }

  if (!search && !buses) {
    return (
      <div className={style.loader}>
        <CircularProgress />
      </div>
    );
  }

  const data = buses[0];

  return (
    <>
      {buses && buses.length !== 0 && (
        <div className={style.container}>
          <div className={style.seatlayout}>
            <Seatlayout busData={buses} />
          </div>
          <div className={style.detailslayout}>
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
            <div className={style.passenger}>
              <h2>Passenger Details</h2>
              <div>
                <Details bus={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
