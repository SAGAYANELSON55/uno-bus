import React, { useEffect } from "react";
import Home from "@/components/home-page/home-page";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { fetchData } from "@/store/data/bus-details";

const Admin = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return <Home />;
};

export default Admin;
