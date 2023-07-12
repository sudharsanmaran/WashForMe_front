export const CATEGORIES_URL = "/core/api/categories/";
export const ITEMS_URL = "/core/api/items/";
export const CART_ITEMS_URL = "/core/api/cart/";
export const UPDATE_TIMESLOTS_URL = "/core/api/update_timeslots/";
export const PICKUP_TIMESLOTS_URL = "/core/api/pickup-timeslots/";
export const delivery_TIMESLOTS_URL = "/core/api/delivery-timeslots/";
export const BOOK_TIMESLOT_URL = "/core/api/book-timeslot/";
export const CART_TO_ORDER_URL = "/core/api/cart_to_order/";
export const RAZORPAY_PAYMENT_INFO_URL = "/core/api/razorpay-payment-info/";
export const RAZORPAY_PAYMENT_STATUS_URL = "/core/api/razorpay-payment-status/";
export const USER_DETAILS_URL = "/core/api/user_details/";
export const ADDRESS_URL = "/core/api/address/";

export const AddressType = Object.freeze({
  PICKUP: 'PICKUP',
  DELIVERY: 'DELIVERY',
  PICKUP_AND_DELIVERY: 'PICKUP_AND_DELIVERY',
});

export const AddressTypes = [...Object.values(AddressType)];
