import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CATEGORIES_URL } from "../constant";
import { PrivateApi } from "../api/axios";

const initialState = {
  loading: false,
  categories: [],
  selectedCategory: null,
  error: "",
};

export const fetchWashCategory = createAsyncThunk(
  "washCategory/fetchWashCategory", () => {
    return PrivateApi.get(CATEGORIES_URL).then(response => (
      response.data
    ));
  }
);


export const washCategoryslice = createSlice({
  name: "washCategory",
  initialState: initialState,
  reducers: {
    updateSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWashCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWashCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.selectedCategory = action.payload[0];
      
    });
    builder.addCase(fetchWashCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || "something went wrong";
    });
  },
});

export const { updateSelectedCategory } = washCategoryslice.actions;
export default washCategoryslice.reducer;
