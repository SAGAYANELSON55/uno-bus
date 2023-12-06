import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";

export const Paymentcompleted = () => {
  const busData = useSelector((state: RootState) => state.busData.busData);
  const filter = useSelector((state: RootState)=> state.seatLog.pathname)
  console.log(filter)
  const router = useRouter();
  function homeLoader() {
    router.replace("/");
  }
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
