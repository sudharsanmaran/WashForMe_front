import { useEffect, useState } from "react";

function ListTimeslots({ timeslots, name, bookTimeSlots }) {
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  useEffect(() => {
    setSelectedTimeslot(null);
  }, [timeslots]);

  const handleTimeslotSelection = (timeslotId) => {
    setSelectedTimeslot(timeslotId);
  };

  const handleBookTimeslot = () => {
    if (selectedTimeslot) {
      const type = name === "Pickup" ? "PICKUP" : "DELIVERY";
      bookTimeSlots({ type, timeslotId: selectedTimeslot });
    }
  };

  return (
    <>
      <h3>{name} Timeslots</h3>
      {timeslots.length > 0 && (
        <ul>
          {timeslots.map((timeslot) => {
            const localStartDatetime = new Date(
              timeslot.start_datetime
            ).toLocaleString();

            const localEndDatetime = new Date(
              timeslot.end_datetime
            ).toLocaleString();

            const isSelected = selectedTimeslot === timeslot.id;

            return (
              <li
                key={timeslot.id}
                className={isSelected ? "selected" : ""}
                onClick={() => handleTimeslotSelection(timeslot.id)}
                style={{ marginTop: 10, marginLeft: 5}}
              >
                {localStartDatetime} - {localEndDatetime}
              </li>
            );
          })}
        </ul>
      )}
      <button
        disabled={!selectedTimeslot}
        onClick={handleBookTimeslot}
      >
        Book {name}
      </button>
    </>
  );
}

export default ListTimeslots;
