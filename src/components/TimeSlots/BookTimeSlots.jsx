import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ADDRESS_URL,
  AddressType,
  BOOK_TIMESLOT_URL,
  CART_TO_ORDER_URL,
  PICKUP_TIMESLOTS_URL,
  RAZORPAY_PAYMENT_INFO_URL,
  RAZORPAY_PAYMENT_STATUS_URL,
  UPDATE_TIMESLOTS_URL,
  delivery_TIMESLOTS_URL,
} from "../../constant";
import { PrivateApi } from "../../api/axios";
import ListTimeslots from "./ListTimeslots";
import { fetchUserDetails } from "../../store/UserSlice";
import AddressModal from "../AddressModal/AddressModal";
import RazorpayButton from "./RazorpayButton";

const updateTimeSlots = async () => {
  try {
    await PrivateApi.put(UPDATE_TIMESLOTS_URL);
  } catch (err) {
    throw new Error("Something went wrong while updating time slots.");
  }
};

const fetchTimeSlots = async (url, params) => {
  try {
    const response = await PrivateApi.get(url, { params });

    const timeslotMap = response.data.reduce((acc, item) => {
      acc.set(item.date, item.timeslots);
      return acc;
    }, new Map());

    return timeslotMap;
  } catch (err) {
    throw new Error("Something went wrong while fetching time slots.");
  }
};

const bookTimeSlot = async (type, timeslotId, addressId) => {
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

const updateRazopayStatus = async ({
  payment_id,
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  try {
    return await PrivateApi.post(RAZORPAY_PAYMENT_STATUS_URL, {
      payment_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
  } catch (err) {
    throw new Error(
      "Something went wrong while updating razorpay payment status."
    );
  }
};

const getPrimaryAddressId = (addresses, type) => {
  return addresses.find((address) => {
    if (AddressType.PICKUP_AND_DELIVERY === address.type && address.is_primary) {
      return address;
    } else {
      if (address.type === type && address.is_primary) return address;
    }
  })?.id;
};

function BookTimeSlots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address: addresses } = useSelector((state) => state.userDetails.userDetails);

  const [state, setState] = useState({
    selectedDate: "",
    renderAddress: false,
    isTimeslotBooked: {
      pickup: false,
      delivery: false,
    },
    isLoading: true,
    error: "",
    timeSlots: new Map(),
  });

  const pickupBookingId = useRef();
  const deliveryBookingId = useRef();
  const razorpayPaymentInfo = useRef();

  const shopId = 1;

  useEffect(() => {
    Promise.all([
      updateTimeSlots(),
      fetchTimeSlots(PICKUP_TIMESLOTS_URL, { shop_id: shopId }),
      dispatch(fetchUserDetails()),
    ])
      .then(([_, timeslotMap]) => {
        const iterator = timeslotMap.keys();
        setState((prevState) => ({
          ...prevState,
          selectedDate: iterator.next().value,
          timeSlots: timeslotMap,
          isLoading: false,
          error: "",
        }));
      })
      .catch((error) => {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          error: error.message,
        }));
      });
  }, [shopId]);

  const handleDateSelection = (date) => {
    setState((prevState) => ({
      ...prevState,
      selectedDate: date,
    }));
  };

  const handleBookTimeslot = async (type, timeslotId) => {
    const addressId = getPrimaryAddressId(addresses, type);

    if (!addressId) {
      if (!addresses.length) {
        setState((prevState) => ({
          ...prevState,
          renderAddress: true,
        }));
        return;
      }
      // else render modal to select available address
    }

    try {
      const response = await bookTimeSlot(type, timeslotId, addressId);

      if (type === AddressType.PICKUP) {
        pickupBookingId.current = response.data.id;

        const data = await fetchTimeSlots(delivery_TIMESLOTS_URL, {
          pickup_booking_id: pickupBookingId.current,
        });

        setState((prevState) => ({
          ...prevState,
          timeSlots: data,
          selectedDate: Array.from(data.keys())[0],
          isTimeslotBooked: {
            ...prevState.isTimeslotBooked,
            pickup: true,
          },
        }));
      } else {
        deliveryBookingId.current = response.data.id;

        const orderResponse = await postOrder(
          pickupBookingId.current,
          deliveryBookingId.current
        );

        const paymentInfo = await fetchRazorpayPaymentInfo(orderResponse.data.id);

        razorpayPaymentInfo.current = paymentInfo.data;

        setState((prevState) => ({
          ...prevState,
          isTimeslotBooked: {
            ...prevState.isTimeslotBooked,
            delivery: true,
          },
        }));
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  const handlePostAddress = async (data) => {
    try {
      await postAddress(data);
      dispatch(fetchUserDetails());
      setState((prevState) => ({
        ...prevState,
        renderAddress: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        renderAddress: false,
      }));
    }
  };

  const handleUpdateRazopayStatus = async (data) => {
    try {
      await updateRazopayStatus({
        ...data,
        payment_id: razorpayPaymentInfo.current.payment.id,
      });
      navigate("/");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
    }
  };

  return (
    <>
      {state.renderAddress && (
        <AddressModal
          postAddress={handlePostAddress}
          setOpen={(value) =>
            setState((prevState) => ({
              ...prevState,
              renderAddress: value,
            }))
          }
          open={state.renderAddress}
        />
      )}

      <h3>Time Slots</h3>
      {state.timeSlots.size > 0 &&
        Object.keys(state.isTimeslotBooked).some((key) => !state.isTimeslotBooked[key]) &&
        Array.from(state.timeSlots.keys()).map((date) => {
          const isActive = date === state.selectedDate;
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

      {state.selectedDate && !state.isTimeslotBooked.pickup && (
        <>
          <ListTimeslots
            timeslots={state.timeSlots.get(state.selectedDate)}
            name={"Pickup"}
            bookTimeSlots={({ type, timeslotId }) =>
              handleBookTimeslot(type, timeslotId)
            }
          />
        </>
      )}
      {state.selectedDate && state.isTimeslotBooked.pickup && !state.isTimeslotBooked.delivery && (
        <>
          <ListTimeslots
            timeslots={state.timeSlots.get(state.selectedDate)}
            name={"Delivery"}
            bookTimeSlots={({ type, timeslotId }) =>
              handleBookTimeslot(type, timeslotId)
            }
          />
        </>
      )}
      {state.isTimeslotBooked.pickup && state.isTimeslotBooked.delivery && (
        <RazorpayButton
          disabled={!state.isTimeslotBooked.delivery}
          razorpay={razorpayPaymentInfo.current?.razorpay}
          updateRazopayStatus={handleUpdateRazopayStatus}
        />
      )}
    </>
  );
}

export default BookTimeSlots;
