import { useEffect, useState } from "react";

function ListTimeslots({ timeslots, name, bookTimeSlots }) {
  const [slectedTimeslots, setSelectedTimeslots] = useState("");

  useEffect(() => {
    setSelectedTimeslots("");
  }, [timeslots]);

  const handleBookTimeslots = ()=>{
    const type = name === 'Pickup' ? 'PICKUP': 'DELIVERY';
    bookTimeSlots({type, timeslotId: slectedTimeslots})
  }

  return (
    <>
      <h3>{name} Timeslots</h3>
      {timeslots.length && (
        <ul>
          {timeslots.map((timeslot) => {
            const localStartDatetime = new Date(
              timeslot.start_datetime
            ).toLocaleString();

            const localEndDatetime = new Date(
              timeslot.end_datetime
            ).toLocaleString();

            const isActive = slectedTimeslots === timeslot.id;

            return (
              <li
                key={timeslot.id}
                className={isActive ? "selected" : ""}
                onClick={() => setSelectedTimeslots(timeslot.id)}
                style={{marginTop:10, marginLeft: 5}}
              >
                {localStartDatetime} -{localEndDatetime}
              </li>
            );
          })}
        </ul>
      )}
      <button 
      disabled={!slectedTimeslots}
      onClick={() => handleBookTimeslots()}
      >Book {name}</button>
    </>
  );
}

export default ListTimeslots;
