import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import style from "./details.module.css";
import DetailsForm from "./deatils-form";

const Details = () => {
  const seatDetail = useSelector((state: RootState) => state.seatLog.seats);

  const [invalid, setinValid] = useState(true);

  useEffect(() => {
    const seats = seatDetail.filter(
      (seat) => seat.name && seat.age && seat.gender
    );
    console.log(seats);
    setinValid(seatDetail.length ? seatDetail.length !== seats.length : false);
  }, []);

  return (
    <>
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
          <div className={style.submitbutton}>
            <button type="submit" disabled={invalid}>
              continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
