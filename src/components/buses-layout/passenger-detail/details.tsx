import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Details = () => {
  const seatDetail = useSelector((state: RootState) => state.seatLog.seats);
  return (
    <>
      {seatDetail && (
        <div>
          <form>
            <table>
              <tbody>
                <tr>
                  <th>
                    <label htmlFor="sno">S.No</label>
                  </th>
                  <th>
                    <label htmlFor="name">Name</label>
                  </th>
                  <th>
                    <label htmlFor="age">Age</label>
                  </th>
                  <th>
                    <label htmlFor="gender">Gender</label>
                  </th>
                  <th>
                    <label htmlFor="SeatNo">SeatNo</label>
                  </th>
                </tr>
                <tr>
                  <td>{seatDetail.length}</td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={seatDetail[0]?.name}
                      //   onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={seatDetail[0]?.age}
                      //   onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      id="gender"
                      name="gender"
                      value={seatDetail[0]?.gender}
                      //   onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </td>
                  <td>{seatDetail[0]?.seatNumber}</td>
                </tr>
              </tbody>
            </table>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Details;
