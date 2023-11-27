import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import style from "./buses.module.css";
import Busitem from "./bus";
import { useRouter } from "next/router";

const Buseslist: React.FC = () => {
  const busesDetails = useSelector((state: RootState) => state.busData);
  const router = useRouter();
  const search = router.query.search?.toString().split(" ");
  console.log(busesDetails);
  const buses = busesDetails?.busData?.buses.filter(
    (bus) => bus.source === search[0] && bus.destination === search[1]
  );
  console.log(search);
  return (
    <>
      {search[0] !== "null" && search[1] !== "null" ? (
        <div className={style.container}>
          {buses.map((bus) => (
            <Busitem key={bus.busNo} data={bus} />
          ))}
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: 20 }}>No buses Found</h2>
      )}
    </>
  );
};

export default Buseslist;
