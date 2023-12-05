import React from "react";
import style from "./legents.module.css";

function Legents() {
  return (
    <>
      <div className={style.legents}>
        <div className={style.col}>
          <div className={style.legent}>
            <div className={style.label}>Seater:</div>
            <div className={style.label}>Sleeper: </div>
          </div>
          <div className={style.legent}>
            <div className={style.seater}></div>
            <div className={style.sleeper}></div>
          </div>
        </div>
        <div className={style.col}>
          <div className={style.legent}>
            <div className={style.label}>Selected:</div>
            <div className={style.label}>Booked:</div>
          </div>
          <div className={style.legent}>
            <div className={`${style.seater} ${style.selected}`}></div>
            <div className={`${style.seater} ${style.booked}`}></div>
          </div>
        </div>
        <div className={style.col}>
          <div className={style.legent}>
            <div className={style.label}>Booked by Female:</div>
            <div className={style.label}>Female only:</div>
          </div>
          <div className={style.legent}>
            <div className={`${style.seater} ${style["booked-female"]}`}></div>
            <div className={`${style.seater} ${style["female-only"]}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Legents;
