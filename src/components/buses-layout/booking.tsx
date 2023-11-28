import React from "react";
import style from "./booking.module.css";
import Seatlayout from "./bus-layout/seat-layout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const Booking = () => {
  const busData = useSelector((state: RootState) => state.busData.busData);
  const router = useRouter();

  const search = router.query.busno && router.query.busno.toString();
  console.log(search);

  const buses = search && busData.buses.filter((bus) => bus.busNo === search);

  if (search && buses && buses.length === 0) {
    console.log("pagenot found");
    router.replace("404.tsx");
  }
  console.log(buses);

  return (
    <>
      {buses && buses.length !== 0 && (
        <div className={style.container}>
          <Seatlayout busData={buses} />
        </div>
      )}
      {!search && !buses && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      ;
    </>
  );
};

export default Booking;
