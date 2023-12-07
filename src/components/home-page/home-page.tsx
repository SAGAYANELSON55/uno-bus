import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import style from "./home-page.module.css";
import React from "react";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { search } from "@/models/bus-data";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import dayjs from "dayjs";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [calledPush, setCalledPush] = useState(false);
  const router = useRouter();
  const busData = useSelector((state: RootState) => state.busData.busData);
  const [searchData, setSearchData] = React.useState<search>({
    source: null,
    destination: null,
  });

  const sourceLabel = Array.from(
    new Set(busData?.buses?.map((bus) => bus.source))
  );

  const destinationLabel = Array.from(
    new Set(busData?.buses?.map((bus) => bus.destination))
  );

  const searchHandler = () => {
    if (calledPush) {
      return;
    }
    router.push({
      pathname: "/buses",
      query: {
        search: `${searchData.source} ${searchData.destination}`,
      },
    });
    setCalledPush(true);
  };

  const today = dayjs();
  const maxDate = dayjs(today).add(1, "month").startOf("month");

  return (
    <>
      <div className={style.container}>
        <p>
          Uno
          <span>
            <DirectionsBusFilledIcon fontSize="large" />
          </span>
          Bus
        </p>

        <div className={style.search}>
          <h2>Get Set Go</h2>
          <Stack spacing={2}>
            <Autocomplete
              disablePortal
              id="from-location"
              value={searchData?.source}
              onChange={(event: any, newValue: string | null) => {
                setSearchData((prev) => ({
                  ...prev,
                  source: newValue,
                }));
              }}
              className={style.control}
              options={sourceLabel}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="From" />}
            />
            <Autocomplete
              disablePortal
              id="To-location"
              className={style.control}
              value={searchData?.destination}
              onChange={(event: any, newValue: string | null) => {
                setSearchData((prev) => ({
                  ...prev,
                  destination: newValue,
                }));
              }}
              options={destinationLabel}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="TO" />}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disablePast={true}
                sx={{ width: 300 }}
                maxDate={maxDate}
              />
            </LocalizationProvider>
            <div className={style.actions}>
              <button onClick={searchHandler}>Search Bus</button>
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Home;
