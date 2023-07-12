import { useCallback, useEffect } from "react";
import useRazorpay from "react-razorpay";

export default function RazorpayButton({ razorpay, updateRazopayStatus, disabled }) {
  const Razorpay = useRazorpay();
  const handlePayment = useCallback(() => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpay?.amount,
      currency: razorpay?.currency,
      name: "WashForMe",
      order_id: razorpay?.id,
      handler: (res) => {
        updateRazopayStatus(res);
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
      <button style={{marginTop: 5}} disabled={disabled} onClick={handlePayment}>Make Payment</button>
    </div>
  );
}
