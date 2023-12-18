import { Bus } from "@/models/bus-data";
import styles from "./bus.module.css";
import { useRouter } from "next/router";
import { DeleteOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { busActions } from "@/store/data/bus-details";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

interface Props {
  data: Bus;
  key: string;
}
async function Deletion(data: Bus) {
  try {
    const result = await fetch("/api/busData/deletebusdata", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!result.ok) {
      const response = await result.json();
      throw new Error(response.error);
    }

    const res = await result.json();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}
const Busitem: React.FC<Props> = ({ data, key }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const mode = session?.user?.name;

  const viewSeatHandler = () => {
    if (mode === "Admin") {
      router.push({
        pathname: `/admin/buslist/viewSeat`,
        query: { busno: `${data.busNo}` },
      });
    } else {
      router.push({
        pathname: `./buses/booking`,
        query: { busno: `${data.busNo}` },
      });
    }
  };

  async function deleteHandler() {
    console.log("deleting..");
    Deletion(data);
    dispatch(busActions.deleteBus(data.busNo));
    console.log(data);
  }

  function bookingHandler() {
    router.push({
      pathname: "/admin/buslist/bookinglog",
      query: { busno: `${data.busNo}` },
    });
  }

  return (
    <div className={styles.card} key={key}>
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
        {mode === "Admin" && (
          <div className={styles.wrap}>
            <button className={styles.booking} onClick={bookingHandler}>
              Bookings
            </button>
            <DeleteOutlined className={styles.delete} onClick={deleteHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Busitem;
