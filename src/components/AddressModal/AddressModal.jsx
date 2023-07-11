import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DevTool } from "@hookform/devtools";

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

export default function AddressModal() {
  const form = useForm();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const { register, control, handleSubmit, formState } = form;

  const {errors} = formState;

  const onSubmit = (data) => {
    console.log("form submitted", data);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            marginBottom={3}
          >
            Need Address To Book
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ marginTop: 5 }}>Address Line 1 </label>
            <br />
            <input
              id="addressLine1"
              style={{ marginTop: 5, marginBottom: 5 }}
              {...register("addressLine1", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.addressLine1?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>Address Line 2 </label>
            <br />
            <input
              id="addressLine2"
              style={{ marginTop: 5 }}
              {...register("addressLine2", {
                required:{
                  value: true,
                }
              })}
            ></input>
             <p>{errors.addressLine2?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>City</label>
            <br />
            <input
              id="city"
              style={{ marginTop: 5 }}
              {...register("city", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.city?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>Country</label>
            <br />
            <input
              id="country"
              style={{ marginTop: 5 }}
              {...register("country", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.country?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>Pincode</label>
            <br />
            <input
              id="pincode"
              style={{ marginTop: 5 }}
              {...register("pincode", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.pincode?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>Type</label>
            <br />
            <input
              id="type"
              style={{ marginTop: 5 }}
              {...register("type", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.type?.message}</p>
            <br />

            <label style={{ marginTop: 5 }}>Is Primary</label>
            <br />
            <input
              id="isPrimary"
              style={{ marginTop: 5 }}
              {...register("isPrimary", {
                required:{
                  value: true,
                }
              })}
            ></input>
            <p>{errors.isPrimary?.message}</p>

            <button>submit</button>
          </form>
          <DevTool control={control}/>
        </Box>
      </Modal>
    </div>
  );
}
