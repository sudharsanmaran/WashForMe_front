import { useEffect, useState } from "react";
import { PICKUP_TIMESLOTS_URL, UPDATE_TIMESLOTS_URL } from "../../constant";
import { PrivateApi } from "../../api/axios";
import ListTimeslots from "./ListTimeslots";
import { fetchUserDetails } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Address from "../Address/Address";
import AddressModal from "../AddressModal/AddressModal";

const updateTimeSlots = async () => {
  try {
    await PrivateApi.put(UPDATE_TIMESLOTS_URL);
  } catch (err) {
    throw new Error("Something went wrong while updating time slots.");
  }
};

const fetchPickupTimeSlots = async (shopId) => {
  try {
    const response = await PrivateApi.get(PICKUP_TIMESLOTS_URL, {
      params: { shop_id: shopId },
    });

    const timeslotMap = response.data.reduce((acc, item) => {
      acc.set(item.date, item.timeslots);
      return acc;
    }, new Map());

    return timeslotMap;
  } catch (err) {
    throw new Error("Something went wrong while fetching pickup time slots.");
  }
};

const getaddressId = (userDetails) => {
  return null

};

const bookTimeSlots = async (type, timeslotId, addressId) => {
  try {

    await PrivateApi.post(PICKUP_TIMESLOTS_URL, {
      type,
      timeslotId,
      addressId,
    });
  } catch (err) {
    throw new Error("Something went wrong while booking selected time slot.");
  }
};

function BookTimeSlots() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const address = useSelector((state) => state.userDetails.userDetails.address);
  const [selectedDate, setSelectedDate] = useState("");
  const [rederAddress, setRenderaddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [pickupTimeSlots, setPickupTimeSlots] = useState(new Map());
  const shopId = 1;

  useEffect(() => {
    Promise.all([
      updateTimeSlots(),
      fetchPickupTimeSlots(shopId),
      dispatch(fetchUserDetails()),
    ])
      .then(([_, timeslotMap]) => {
        const iterator = timeslotMap.keys();
        setSelectedDate(iterator.next().value);
        setPickupTimeSlots(timeslotMap);
        setIsLoading(false);
        setError("");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, [shopId]);

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  const handleBookTimeslot = (type, timeslotId) => {

    const addressId = getaddressId(address)

    if (!addressId) {
      setRenderaddress(true)
      return; 
    }

    bookTimeSlots(type, timeslotId, addressId)

  }

  return (
    <>
      {rederAddress && <AddressModal/>}
      <h3>Select Date</h3>
      {pickupTimeSlots.size > 0 &&
        Array.from(pickupTimeSlots.keys()).map((date) => {
          const isActive = date === selectedDate;
          return (
            <button
              key={date}
              style={{ marginLeft: 5, marginTop: 5 }}
              className={isActive ? "selected" : ""}
              onClick={() => handleDateSelection(date)}
            >
              {date}
            </button>
          );
        })}

      {selectedDate && (
        <>
          <ListTimeslots
            timeslots={pickupTimeSlots.get(selectedDate)}
            name={"Pickup"}
            bookTimeSlots={({ type, timeslotId }) =>
              handleBookTimeslot(type, timeslotId)
            }
          />
        </>
      )}
    </>
  );
}

export default BookTimeSlots;
