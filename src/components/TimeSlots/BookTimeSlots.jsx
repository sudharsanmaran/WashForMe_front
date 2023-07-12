import { useEffect, useRef, useState } from "react";
import {
  ADDRESS_URL,
  AddressType,
  BOOK_TIMESLOT_URL,
  CART_TO_ORDER_URL,
  PICKUP_TIMESLOTS_URL,
  RAZORPAY_PAYMENT_INFO_URL,
  UPDATE_TIMESLOTS_URL,
  delivery_TIMESLOTS_URL,
} from "../../constant";
import { PrivateApi } from "../../api/axios";
import ListTimeslots from "./ListTimeslots";
import { fetchUserDetails } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AddressModal from "../AddressModal/AddressModal";
import RazorpayButton from "./RazorpayButton";

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
    throw new Error("Something went wrong while fetching time slots.");
  }
};

const fetchDeliveryTimeSlots = async (pickupBookingId) => {
  try {
    const response = await PrivateApi.get(delivery_TIMESLOTS_URL, {
      params: { pickup_booking_id: pickupBookingId },
    });

    const timeslotMap = response.data.reduce((acc, item) => {
      acc.set(item.date, item.timeslots);
      return acc;
    }, new Map());

    return timeslotMap;
  } catch (err) {
    throw new Error("Something went wrong while fetching time slots.");
  }
};

const bookTimeSlots = async (type, timeslotId, addressId) => {
  try {
    return await PrivateApi.post(BOOK_TIMESLOT_URL, {
      booking_type: type,
      time_slot: timeslotId,
      address: addressId,
    });
  } catch (err) {
    throw new Error("Something went wrong while booking selected time slot.");
  }
};

const fetchRazorpayPaymentInfo = async (orderId) => {
  try {
    return await PrivateApi.get(RAZORPAY_PAYMENT_INFO_URL, {
      params: { order_id: orderId },
    });
  } catch (err) {
    throw new Error("Something went wrong while updating Address.");
  }
};

const postAddress = async (data) => {
  try {
    return await PrivateApi.post(ADDRESS_URL, data);
  } catch (err) {
    throw new Error("Something went wrong while updating Address.");
  }
};

const postOrder = async (pickupBookingId, deliveryBookingId) => {
  try {
    return await PrivateApi.post(CART_TO_ORDER_URL, {
      pickup_booking: pickupBookingId,
      delivery_booking: deliveryBookingId,
    });
  } catch (err) {
    throw new Error("Something went wrong while updating Order.");
  }
};

const getaddressId = (address, type) => {
  return address.find((add) => {
    if (AddressType.PICKUP_AND_DELIVERY == add.type && add.is_primary) {
      return add;
    } else {
      if (AddressType.type == type && add.is_primary) return add;
    }
  })?.id;
};

function BookTimeSlots() {
  const dispatch = useDispatch();

  const address = useSelector((state) => state.userDetails.userDetails.address);

  const [selectedDate, setSelectedDate] = useState("");
  const [renderAddress, setRenderaddress] = useState(false);
  const [isPickupBooked, setIsPickupBooked] = useState(false);
  const [isDeliveryBooked, setIsDeliveryBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [TimeSlots, setTimeSlots] = useState(new Map());

  const pickupBookingId = useRef();
  const deliveryBookingId = useRef();
  const razorpayPaymentInfo = useRef();

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
        setTimeSlots(timeslotMap);
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
    const addressId = getaddressId(address, type);

    if (!addressId) {
      if (!address.length) {
        setRenderaddress(true);
        return;
      }
      // else render modal to select available address
    }

    const response = bookTimeSlots(type, timeslotId, addressId);

    response.then((response) => {
      if (type === AddressType.PICKUP) {
        pickupBookingId.current = response.data.id;

        fetchDeliveryTimeSlots(pickupBookingId.current).then((data) => {
          setTimeSlots(data);
          const iterator = data.keys();
          setSelectedDate(iterator.next().value);
          setIsPickupBooked(true);
        });
      } else {
        deliveryBookingId.current = response.data.id;

        postOrder(pickupBookingId.current, deliveryBookingId.current).then(
          (response) => {
            fetchRazorpayPaymentInfo(response.data.id).then((paymentInfo) => {
              console.log(paymentInfo, "payment");
              razorpayPaymentInfo.current = paymentInfo.data.razorpay;
              setIsDeliveryBooked(true);
            });
          }
        );
      }
    });
  };

  const handlePostAddress = (data) => {
    try {
      const response = postAddress(data);
      response.then(() => {
        dispatch(fetchUserDetails());
        setRenderaddress(false);
      });
    } catch (err) {
      setError(error.message);
      setRenderaddress(false);
    }
  };

  return (
    <>
      {renderAddress && (
        <AddressModal
          postAddress={handlePostAddress}
          setOpen={setRenderaddress}
          open={renderAddress}
        />
      )}

      {TimeSlots.size > 0 &&
        (!isPickupBooked || !isDeliveryBooked) &&
        Array.from(TimeSlots.keys()).map((date) => {
          const isActive = date === selectedDate;
          return (
            <>
              <h3>Select Date</h3>
              <button
                key={date}
                style={{ marginLeft: 5, marginTop: 5 }}
                className={isActive ? "selected" : ""}
                onClick={() => handleDateSelection(date)}
              >
                {date}
              </button>
            </>
          );
        })}

      {selectedDate && !isPickupBooked && (
        <>
          <ListTimeslots
            timeslots={TimeSlots.get(selectedDate)}
            name={"Pickup"}
            bookTimeSlots={({ type, timeslotId }) =>
              handleBookTimeslot(type, timeslotId)
            }
          />
        </>
      )}
      {selectedDate && isPickupBooked && !isDeliveryBooked && (
        <>
          <ListTimeslots
            timeslots={TimeSlots.get(selectedDate)}
            name={"Delivery"}
            bookTimeSlots={({ type, timeslotId }) =>
              handleBookTimeslot(type, timeslotId)
            }
          />
        </>
      )}
      {isPickupBooked && isDeliveryBooked && (
        <RazorpayButton razorpay={razorpayPaymentInfo.current} />
      )}
    </>
  );
}

export default BookTimeSlots;
