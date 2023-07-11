import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi } from "../api/axios";
import { USER_DETAILS_URL } from "../constant";

const initialState = {
  loading: false,
  userDetails: {},
  error: "",
};

export const fetchUserDetails = createAsyncThunk("userDetails/fetchUserDetails", () =>
  PrivateApi.get(USER_DETAILS_URL).then((response) => response.data)
);

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
    });

    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload
        state.error = ''
        state.loading = false;
    });

    builder.addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  },
});

export default userDetails.reducer;