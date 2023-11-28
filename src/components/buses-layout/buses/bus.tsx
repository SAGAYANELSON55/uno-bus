import { Bus } from "@/models/bus-data";
import styles from "./bus.module.css";
import { useRouter } from "next/router";

interface Props {
  data: Bus;
}

const Busitem: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const viewSeatHandler = () => {
    router.push({
      pathname: `./buses/booking`,
      query: { busno: `${data.busNo}` },
    });
  };
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <div className={styles.wrapper}>
          <h2>{data.busName}</h2>
          <div className={styles.detail}>
            <div className={styles.col1}>
              <p>Bus No: {data.busNo}</p>
              <p>Source: {data.source}</p>
              <p>Destination: {data.destination}</p>
            </div>
            <div className={styles.col2}>
              <p>Departure Time: {data.departureTime}</p>
              <p>Arrival Time: {data.arrivalTime}</p>
              <p>Model: {data.model}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className={styles.available}>Available Seats: {data.availSeats}</p>
        <button className={styles.viewSeats} onClick={viewSeatHandler}>
          View Seats
        </button>
      </div>
    </div>
  );
};

export default Busitem;
