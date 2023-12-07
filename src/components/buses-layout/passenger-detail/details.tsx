import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import style from "./details.module.css";
import DetailsForm from "./deatils-form";
import Confirm from "./confirm/confirm";
import { Bus } from "@/models/bus-data";

const Details: React.FC<{ bus: Bus }> = ({ bus }) => {
  const seatDetail = useSelector((state: RootState) => state.seatLog.seats);
  const [invalid, setinValid] = useState(true);
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const seats = seatDetail.filter(
      (seat) => seat.name && seat.age && seat.gender
    );

    console.log(seats);
    setinValid(seatDetail.length ? seatDetail.length !== seats.length : true);
  }, [seatDetail]);

  function confirmhandler() {
    if (!invalid) {
      setConfirm((prev) => !prev);
    }
  }

  function closeHandler() {
    setConfirm(false);
  }

  return (
    <>
      {confirm && (
        <Confirm seats={seatDetail} bus={bus} onClose={closeHandler} />
      )}
      {seatDetail && (
        <div className={style.container}>
          <div className={style["table-container"]}>
            <form>
              <table>
                <thead>
                  <tr className={style["table-header"]}>
                    <th className={style.sno}>S.No</th>
                    <th className={style.name}>Name</th>
                    <th className={style.Age}>Age</th>
                    <th className={style.gender}>Gender</th>
                    <th className={style.seatno}>SeatNo</th>
                  </tr>
                </thead>
                <tbody className={style.content}>
                  {seatDetail.length !== 0 &&
                    seatDetail.map((seat, index) => {
                      return (
                        <DetailsForm
                          key={seat.seatNumber}
                          seat={seat}
                          index={index}
                        />
                      );
                    })}
                </tbody>
              </table>
            </form>
          </div>
          <div>
            {seatDetail.length === 5 && (
              <p className={style.notify}>Max booking five seats only*</p>
            )}
          </div>
          <div>
            {seatDetail.length !== 0 && (
              <p className={style.price}>
                {` Total Price: ₨
                ${seatDetail.reduce((accumulator, currentValue) => {
                  return accumulator + currentValue.price;
                }, 0)}
                `}
              </p>
            )}
          </div>
          <div className={style.submitbutton}>
            <button type="submit" disabled={invalid} onClick={confirmhandler}>
              continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
