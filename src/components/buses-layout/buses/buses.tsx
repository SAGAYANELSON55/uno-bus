// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import style from "./buses.module.css";
// import Busitem from "./bus";
// import { useRouter } from "next/router";

// const Buseslist: React.FC = () => {
//   const busesDetails = useSelector((state: RootState) => state.busData);

//   const router = useRouter();
//   const search = router.query.search?.toString()?.split(" ");
//   console.log(busesDetails);
//   console.log(router.query.search);
//   const buses = busesDetails?.busData?.buses.filter(
//     (bus) => bus.source === search[0] && bus.destination === search[1]
//   );
//   console.log(search);
//   return (
//     <>
//       {search && search[0] !== "null" && search[1] !== "null" ? (
//         <div className={style.container}>
//           {buses.map((bus) => (
//             <Busitem key={bus.busNo} data={bus} />
//           ))}
//         </div>
//       ) : (
//         <h2 style={{ textAlign: "center", marginTop: 20 }}>No buses Found</h2>
//       )}
//     </>
//   );
// };

// export default Buseslist;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import style from "./buses.module.css";
import Busitem from "./bus";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchData } from "@/store/data/bus-details";

const Buseslist: React.FC = () => {
  const busesDetails = useSelector((state: RootState) => state.busData);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const router = useRouter();

  const search = router.query.search?.toString()?.split(" ");

  const buses =
    search && search[0] !== "null" && search[1] !== "null"
      ? search.length === 2 &&
        busesDetails?.busData?.buses.filter(
          (bus) => bus.source === search[0] && bus.destination === search[1]
        )
      : busesDetails?.busData?.buses;

  return (
    <>
      {buses.length !== 0 && (
        <div className={style.container}>
          {buses.map((bus) => (
            <Busitem key={bus.busNo} data={bus} />
          ))}
        </div>
      )}

      {!buses && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      {search && ((buses && buses.length === 0) || !buses) && (
        <h2 style={{ textAlign: "center", marginTop: "20" }}>No buses Found</h2>
      )}
    </>
  );
};

export default Buseslist;
