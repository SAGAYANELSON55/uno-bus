import Seatlayout from "@/components/buses-layout/bus-layout/seat-layout";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import style from "./view-seat.module.css";

const Viewseat = () => {
  const router = useRouter();
  const search = router.query.busno && router.query.busno.toString();
  const busData = useSelector(
    (state: RootState) => state.busData.busData.buses
  );
  console.log(search);
  console.log(busData);

  const buses =
    search && busData !== null && busData.filter((bus) => bus.busNo === search);

  console.log(buses);
  return (
    <>
      {!buses && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      {buses && buses.length === 1 && (
        <div className={style.container}>
          <div className={style.seatlayout}>
            <Seatlayout busData={buses} />
          </div>
        </div>
      )}
    </>
  );
};

export default Viewseat;
