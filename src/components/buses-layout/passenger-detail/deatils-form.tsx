import { Seat } from "@/models/bus-data";
import React, { useCallback, useEffect, useState } from "react";
import { isNotEmpty, hasMinLength, isalpha } from "@/helpers/validation";
import style from "./deatils-form.module.css";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch } from "react-redux";

const DetailsForm: React.FC<{ seat: Seat; index: number; key: string }> =
  React.memo(function Detailsform({ seat, index }) {
    const dispatch = useDispatch();
    const [enteredValues, setEnteredValues] = useState({
      name: "",
      age: "",
      gender: "",
    });

    const [didEdit, setDidEdit] = useState({
      name: false,
      age: false,
      gender: false,
    });

    let nameIsInvalid =
      didEdit.name &&
      (!isNotEmpty(enteredValues.name) ||
        !hasMinLength(enteredValues.name, 3) ||
        !isalpha(enteredValues.name));

    const nameValid =
      (hasMinLength(enteredValues.name, 3) && isalpha(enteredValues.name)) ||
      !isNotEmpty(enteredValues.name);

    let ageIsInvalid =
      didEdit.age && (+enteredValues.age < 5 || +enteredValues.age > 100);

    const ageValid =
      (+enteredValues.age > 5 && +enteredValues.age <= 100) ||
      enteredValues.age === "";

    const handleInputChange = useCallback(
      (identifier: string, value: string) => {
        setEnteredValues((prevValues) => ({
          ...prevValues,
          [identifier]: value,
        }));
        if (identifier === "gender") {
          setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: true,
          }));
        } else {
          setDidEdit((prevEdit) => ({
            ...prevEdit,
            [identifier]: false,
          }));
        }
      },
      []
    );

    const handleInputBlur = useCallback((identifier: string) => {
      setDidEdit((prevEdit) => ({
        ...prevEdit,
        [identifier]: true,
      }));
    }, []);

    useEffect(() => {
      if (didEdit.name) {
        if (nameIsInvalid) {
          dispatch(setSeatLog.addName({ name: undefined, index }));
        } else {
          dispatch(setSeatLog.addName({ name: enteredValues.name, index }));
        }
      }

      if (didEdit.age) {
        if (ageIsInvalid) {
          dispatch(setSeatLog.addAge({ age: undefined, index }));
        } else {
          dispatch(setSeatLog.addAge({ age: enteredValues.age, index }));
        }
      }

      if (didEdit.gender) {
        dispatch(setSeatLog.addGender({ gender: enteredValues.gender, index }));
      }
    }, [nameValid, ageValid, didEdit, dispatch, enteredValues, index]);

    return (
      <tr key={seat.seatNumber}>
        <td>{index + 1}</td>
        <td>
          <div className={style.container}>
            <input
              type="text"
              id={`name-${seat.seatNumber}`}
              name="name"
              autoComplete="name"
              value={enteredValues.name}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              onBlur={() => handleInputBlur("name")}
            />
            {nameIsInvalid && (
              <span className={style.error}>min-length 3 && only[a-z]</span>
            )}
          </div>
        </td>
        <td>
          <div className={style.container}>
            <input
              type="number"
              id={`age-${seat.seatNumber}`}
              name="age"
              autoComplete="number"
              value={enteredValues.age}
              min={5}
              max={100}
              onChange={(event) => handleInputChange("age", event.target.value)}
              onBlur={() => handleInputBlur("age")}
            />
            {ageIsInvalid && <span className={style.error}>age[5-100]</span>}
          </div>
        </td>
        <td>
          {seat.seatConstraint === true ? (
            <select
              id={`gender-${seat.seatNumber}`}
              name="gender"
              value={enteredValues.gender}
              onChange={(event) =>
                handleInputChange("gender", event.target.value)
              }
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <select
              id={`gender-${seat.seatNumber}`}
              name="gender"
              value={enteredValues.gender}
              onChange={(event) =>
                handleInputChange("gender", event.target.value)
              }
            >
              <option value="">Select Gender</option>

              <option value="male">Male</option>

              <option value="female">Female</option>

              <option value="other">Other</option>
            </select>
          )}
        </td>
        <td>{seat.seatNumber}</td>
      </tr>
    );
  });

export default DetailsForm;
