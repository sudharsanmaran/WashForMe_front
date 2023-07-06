import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITEMS_URL } from "../constant";
import { PrivateApi } from "../api/axios";

const initialState = {
  loading: false,
  items: [],
  error: "",
};

export const fetchWashItem = createAsyncThunk("washItem/fetchWashItem", () => {
  return PrivateApi.get(ITEMS_URL).then((response) => response.data);
});

const washItemslice = createSlice({
  name: "washItem",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWashItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWashItem.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = "";
    });
    builder.addCase(fetchWashItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default washItemslice.reducer;
