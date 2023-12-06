import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";

const Paymentcompleted: React.FC = () => {
  const busData = useSelector((state: RootState) => state.busData.busData);
  const filter = useSelector((state: RootState) => state.seatLog.pathname);
  console.log(filter);
  const router = useRouter();
  function homeLoader() {
    router.replace("/");
  }

  // async function loadData() {
  //   const data = fetch("api/busData/updateBusDetails",{
  //     method: 'PATCH',
  //     headers:{
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify()
  //   });
  // }
  useEffect(() => {});
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

export default Paymentcompleted;
