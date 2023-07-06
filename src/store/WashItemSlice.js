import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ITEMS_URL } from "../constant";
import { PrivateApi } from "../api/axios";

const initialState = {
  loadig: false,
  items: [],
  error: '',
};

export const fetchWashItem = createAsyncThunk(
  "washItem/fetchWashItem", () => {
    return PrivateApi.get(ITEMS_URL).then(response => (
      response.data
    ));
  }
);

export const washItemslice = createSlice({
  name: 'washItem',
  initialState,
  reducers: {},
  extraReducer: builder => {
    builder.addcase(fetchWashItem.pending, (state) =>{
      state.loadig = true;
    })
    builder.addcase(fetchWashItem.fulfilled, (state, action) =>{
      state.loadig = false;
      console.log(action.payload, 'action.payload')
      state.items = action.payload
    })
    builder.addcase(fetchWashItem.rejected, (state, action) =>{
      state.loadig = false;
      state.error = action.error.message
    })
  }
});

export default washItemslice.reducer;
