import { useContext, useState} from "react";
import {api} from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const SENT_OTP_URL = "/core/api/send_otp/";

const OTP_LOGIN_URL = "/core/api/otp_login/";

function LogIn() {
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isOtpsend, setIsOptsend] = useState(false);
  const [otp, setOtp] = useState("");

  const {updateTokens} = useContext(AuthContext)

  const phoneNumberRegex = /^\+[0-9]{1,13}$/;

  const handleOnFocus = () => {
    setIsFocus(true);
  };
  const handleOnBlur = () => {
    setIsFocus(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(phoneNumber);
     await api.post(
        SENT_OTP_URL,
        JSON.stringify({ phone: phoneNumber }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsOptsend(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        OTP_LOGIN_URL,
        JSON.stringify({ phone: phoneNumber, otp: otp }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { access, refresh } = response.data;
      setIsOptsend(false);
      setPhoneNumber("");
      setOtp("");
      updateTokens(access, refresh);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {isOtpsend ? (
        <form onSubmit={handleOtpSubmit}>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <span> </span>
          <button className="btn btn-primary" type="submit">
            Submit OTP
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Phone number:</label>
          <input
            type="tel"
            maxLength={13}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            disabled={isOtpsend}
          />
          {phoneNumber && !phoneNumberRegex.test(phoneNumber) && (
            <p style={{ color: "red" }}>Invalid phone number</p>
          )}
          {isFocus && !phoneNumberRegex.test(phoneNumber) && (
            <p>Enter your phone number in the format +919876543210</p>
          )}
          <span> </span>
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isOtpsend}
          >
            Send OTP
          </button>
        </form>
      )}
    </div>
  );
}

export default LogIn;
