import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi } from "../api/axios";
import { CART_ITEMS_URL } from "../constant";

const initialState = {
  loading: false,
  cartItems: [],
  totalprice: 0,
  totalCount: 0,
  error: "",
};

export const fetchCartItems = createAsyncThunk(
  "cartItem/fetchCartItems",
  () => {
    return PrivateApi.get(CART_ITEMS_URL).then((response) => response.data);
  }
);

export const postaddToCart = createAsyncThunk(
  "cartItem/postaddToCart",
  async (post_data) => {
    return PrivateApi.post(CART_ITEMS_URL, post_data).then(
      (response) => response.data
    );
  }
);

export const patchCart = createAsyncThunk(
  "cartItem/patchCart",
  async ({patch_data, cartItemId}) => {
    return PrivateApi.patch(CART_ITEMS_URL+`${cartItemId}`, patch_data).then(
      (response) => response.data
    );
  }
);

export const asyncAddToCart = createAsyncThunk(
  "cartItem/handleAddToCart",
  async ({ item, wash_category, dispatch }) => {
    const post_data = {
      item: item.id,
      wash_category: wash_category.id,
      quantity: 1,
    };
    console.log(post_data, "postAddToCart");
    dispatch(postaddToCart(post_data)
    ).then(() => dispatch(fetchCartItems()));
  }
);

export const asyncRemoveFromCart = createAsyncThunk(
  "cartItem/handleRemoveFromCart",
  async ({cartItem, dispatch}) => {
    const patch_data = {
      item: cartItem.item.id,
      wash_category: cartItem.wash_category.id,
      quantity: cartItem.quantity - 1,
    };
    dispatch(patchCart({patch_data, cartItemId: cartItem.id})).then(() => dispatch(fetchCartItems()));
  }
);

const cartItem = createSlice({
  name: "cartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      state.totalprice = action.payload.reduce((accumulator, item) => {
        return accumulator + Number(item.price);
      }, 0);
      state.totalCount = action.payload.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);
      state.error = "";
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cartItem.reducer;
