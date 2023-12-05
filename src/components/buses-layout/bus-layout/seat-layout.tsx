import React from "react";
import style from "./seat-layout.module.css";
import { Bus } from "@/models/bus-data";
import Seats from "./seat";
import Legents from "./legents";

const Seatlayout: React.FC<{ busData: Bus[] }> = ({ busData }) => {
  const busDetails = busData && busData[0];
  console.log(busDetails);
  return (
    <div className={style.container}>
      <div className={style.layout}>
        <div>
          <p>LowerDeck</p>
          <div className={style.lowerdeck}>
            <div className={style.group}>
              <div className={style.row1}>
                {busDetails.lowerDeck.row1.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
              <div className={style.row2}>
                {busDetails.lowerDeck.row2.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
              <div className={style.row3}>
                {busDetails.lowerDeck.row3.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Upper Deck</p>
          <div className={style.upperdeck}>
            <div className={style.group}>
              <div className={style.row1}>
                {busDetails.upperDeck.row1.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
              <div className={style.row2}>
                {busDetails.upperDeck.row2.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
              <div className={style.row3}>
                {busDetails.upperDeck.row3.map((bus) => (
                  <Seats key={bus.seatNumber} data={bus} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Legents />
      </div>
    </div>
  );
};

export default Seatlayout;
