import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import "./AddressModal.css";
import { AddressTypes } from "../../constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "150",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddressModal({ postAddress, setOpen, open }) {
  const form = useForm();

  const { register, control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log("form submitted", data);
    postAddress(data);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom={3}
          >
            Address
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label style={{ marginTop: 5 }}>Address Line 1 </label>
              <br />
              <input
                id="addressLine1"
                style={{ marginTop: 5, marginBottom: 5 }}
                {...register("address_line_1", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                  validate: {},
                })}
              ></input>
              <p className="error">{errors.addressLine1?.message}</p>
              <br />

              <label style={{ marginTop: 5 }}>Address Line 2 </label>
              <br />
              <input
                id="addressLine2"
                style={{ marginTop: 5 }}
                {...register("address_line_2", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                })}
              ></input>
              <p className="error">{errors.addressLine2?.message}</p>
              <br />

              <label style={{ marginTop: 5 }}>City</label>
              <br />
              <input
                id="city"
                style={{ marginTop: 5 }}
                {...register("city", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                })}
              ></input>
              <p className="error">{errors.city?.message}</p>
              <br />
            </div>
            <div>
              <label style={{ marginTop: 5 }}>Country</label>
              <br />
              <input
                id="country"
                style={{ marginTop: 5 }}
                {...register("country", {
                  required: {
                    value: true,
                    message: "field is required",
                  },
                })}
              ></input>
              <p className="error">{errors.country?.message}</p>
              <br />

              <label style={{ marginTop: 5 }}>Pincode</label>
              <br />
              <input
                id="pincode"
                style={{ marginTop: 5 }}
                {...register("pincode", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Pincode must be a 6-digit number",
                  },
                })}
              ></input>
              <p className="error">{errors.pincode?.message}</p>
              <br />

              <label style={{ marginTop: 5 }}>Type</label>
              <br />
              <select
                id="type"
                style={{ marginTop: 5 }}
                {...register("type", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                })}
              >
                <option value="">Select Type</option>
                {Object.values(AddressTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <p className="error">{errors.type?.message}</p>
              <br />

              <label style={{ marginTop: 5 }}>Is Primary</label>
              <br />
              <input
                id="isPrimary"
                type="checkbox"
                style={{ marginTop: 5 }}
                {...register("is_primary")}
              />
            </div>

            <button>submit</button>
          </form>
          <DevTool control={control} />
        </Box>
      </Modal>
    </div>
  );
}
