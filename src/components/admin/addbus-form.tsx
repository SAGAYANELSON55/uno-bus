import React, { useState } from "react";
import style from "./addbus-form.module.css";
import { hasSpecialCharacter, isNotEmpty, isalpha } from "@/helpers/validation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Snackbar, Alert } from "@mui/material";
import { CircularProgress } from "@mui/material";

const AddbusForm = () => {
  const model = useSelector((state: RootState) => state.busData.busData.model);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const initialInput = {
    busName: "",
    busNo: "",
    source: "",
    destination: "",
    arrivalTime: "",
    departureTime: "",
    model: "",
  };

  const initailstate = {
    busName: false,
    busNo: false,
    source: false,
    destination: false,
    arrivalTime: false,
    departureTime: false,
    model: false,
  };
  const [enteredValues, setEnteredvalues] = useState(initialInput);

  const [didEdit, setDidEdit] = useState(initailstate);

  const [loader, setLoader] = useState(false);

  const nameIsInvalid =
    didEdit.busName &&
    (!isNotEmpty(enteredValues.busName) || !isalpha(enteredValues.busName));

  const noIsInvalid =
    didEdit.busNo &&
    (!isNotEmpty(enteredValues.busNo) ||
      hasSpecialCharacter(enteredValues.busNo));

  const sourceIsInvalid =
    didEdit.source &&
    (!isNotEmpty(enteredValues.source) || !isalpha(enteredValues.source));

  const destinationIsInvalid =
    didEdit.destination &&
    (!isNotEmpty(enteredValues.destination) ||
      !isalpha(enteredValues.destination));
  const modelIsInvalid = didEdit.model && !enteredValues.model;

  const error =
    nameIsInvalid ||
    noIsInvalid ||
    sourceIsInvalid ||
    destinationIsInvalid ||
    modelIsInvalid;

  function handleInputChange(identifier: string, value: string) {
    setEnteredvalues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier: string) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  async function addbusHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const busData = {
      ...model,
      busName: enteredValues.busName,
      busNo: enteredValues.busNo,
      source: enteredValues.source,
      model: enteredValues.model,
      destination: enteredValues.destination,
      arrivalTime: enteredValues.arrivalTime,
      departureTime: enteredValues.departureTime,
    };

    const data = await fetch("/api/admin/addbus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(busData),
    });

    const res = await data.json();
    console.log(res);
    console.log(busData);
    setLoading(false);
    setOpen(true);
    setLoader(true);
    setTimeout(() => {
      setEnteredvalues(initialInput);
      setDidEdit(initailstate);
      setLoader(false);
    }, 3000);
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setLoader(false);
    setDidEdit(initailstate);
    setEnteredvalues(initialInput);
    setOpen(false);
  };
  console.log(loader);
  return (
    <>
      {loader && (
        <div className={style.loader}>
          <CircularProgress />
        </div>
      )}
      {!loader && (
        <>
          {open && (
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={close}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert onClose={close} severity="success" sx={{ width: "100%" }}>
                Bus Added successfully
              </Alert>
            </Snackbar>
          )}
          <div className={style.container}>
            <h2>Add Bus </h2>
            <form className={style.formContainer} onSubmit={addbusHandler}>
              <div className={style.control}>
                <label htmlFor="BusName">Bus Name</label>
                <input
                  id="BusName"
                  name="BusName"
                  type="text"
                  value={enteredValues.busName}
                  onChange={(event) =>
                    handleInputChange("busName", event.target.value)
                  }
                  onBlur={() => handleInputBlur("busName")}
                  required
                />
                {nameIsInvalid && (
                  <p>*should not be empty and include only alpha</p>
                )}
              </div>
              <div className={style.control}>
                <label htmlFor="BusNo">Bus No</label>
                <input
                  id="BusNo"
                  name="BusNo"
                  type="text"
                  value={enteredValues.busNo}
                  onChange={(event) =>
                    handleInputChange("busNo", event.target.value)
                  }
                  onBlur={() => handleInputBlur("busNo")}
                  required
                />
                {noIsInvalid && (
                  <p>*should not be empty and include only num and alpha</p>
                )}
              </div>
              <div className={style.control}>
                <label htmlFor="source">Source</label>
                <input
                  id="source"
                  name="source"
                  type="text"
                  value={enteredValues.source}
                  onChange={(event) =>
                    handleInputChange("source", event.target.value)
                  }
                  onBlur={() => handleInputBlur("source")}
                  required
                />
                {sourceIsInvalid && (
                  <p>*should not be empty and include only alpha</p>
                )}
              </div>
              <div className={style.control}>
                <label htmlFor="destination">Destination</label>
                <input
                  id="destination"
                  name="destination"
                  type="text"
                  value={enteredValues.destination}
                  onChange={(event) =>
                    handleInputChange("destination", event.target.value)
                  }
                  onBlur={() => handleInputBlur("destination")}
                  required
                />
                {destinationIsInvalid && (
                  <p>*should not be empty and include only alpha</p>
                )}
              </div>
              <div className={style.control}>
                <label htmlFor="depature">Depature Time</label>
                <input
                  id="depature"
                  name="departure"
                  type="time"
                  value={enteredValues.departureTime}
                  onChange={(event) =>
                    handleInputChange("departureTime", event.target.value)
                  }
                  onBlur={() => handleInputBlur("departure")}
                  required
                />
              </div>
              <div className={style.control}>
                <label htmlFor="arrival">Arrival Time</label>
                <input
                  id="arrival"
                  name="arrival"
                  type="time"
                  value={enteredValues.arrivalTime}
                  onChange={(event) =>
                    handleInputChange("arrivalTime", event.target.value)
                  }
                  onBlur={() => handleInputBlur("arrival")}
                  required
                />
              </div>
              <div className={style.control}>
                <label htmlFor="model">Model</label>

                <select
                  id="model"
                  name="model"
                  value={enteredValues.model}
                  onChange={(event) =>
                    handleInputChange("model", event.target.value)
                  }
                >
                  <option value="">Select Model</option>

                  <option value="A/C sleeper-Seater">A/C sleeper-Seater</option>
                </select>
                {modelIsInvalid && <p>*Select a model</p>}
              </div>
              <div className={style.action}>
                <button
                  className={style.actions}
                  type="submit"
                  disabled={error}
                >
                  {loading ? "Adding" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AddbusForm;
