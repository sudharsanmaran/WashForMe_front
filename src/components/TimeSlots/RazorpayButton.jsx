import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { PrivateApi } from "../../api/axios";
import { RAZORPAY_PAYMENT_STATUS_URL } from "../../constant";

const updatestatus = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
    try {
        return await PrivateApi.post(RAZORPAY_PAYMENT_STATUS_URL, {
            razorpay_order_id: razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
        });
      } catch (err) {
        throw new Error("Something went wrong while updating razorpay payment status.");
      }
};

export default function RazorpayButton({ razorpay }) {
  const Razorpay = useRazorpay();
  const handlePayment = useCallback(() => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpay?.amount,
      currency: razorpay?.currency,
      name: "WashForMe",
      order_id: razorpay?.id,
      handler: (res) => {
        console.log(res, "razorpay payment");
        updatestatus(res);
      },
      notes: {
        ...razorpay?.notes,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
}
