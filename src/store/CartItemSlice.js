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

export const asyncAddToCart = createAsyncThunk(
  "cartItem/handleAddToCart",
  async ({ item, selectedCategory: washCategory, dispatch }) => {
    dispatch(addToCart({ item, washCategory }));
    const post_data = {
      item: item.id,
      wash_category: washCategory.id,
      quantity: 1,
    };
    dispatch(postaddToCart(post_data));
  }
);

const cartItem = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, washCategory } = action.payload;
      const price = Number(item.price) + Number(washCategory.extra_per_item);
      state.totalCount += 1;
      state.totalprice += price;

      const existingCartItem = state.cartItems.find(
        (cartItem) =>
          cartItem.washCategory === washCategory.id && cartItem.item === item.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
        existingCartItem.price += price;
      } else {
        const data = {
          item: item.id,
          washCategory: washCategory.id,
          quantity: 1,
          price: price,
        };
        state.cartItems.push(data);
      }
    },

    removeFromCart: (state, action) => {
      const { item, washCategory } = action.payload;
      const price = Number(item.price) + Number(washCategory.extra_per_item);
      state.cartItems.totalCount -= 1;
      state.cartItems.totalprice -= price;

      const existingCartItem = state.cartItems.find(
        (cartItem) =>
          cartItem.washCategory === washCategory.id && cartItem.item === item.id
      );

      if (existingCartItem && existingCartItem.quantity > 1) {
        existingCartItem.price -= price;
        existingCartItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (cartItem) =>
            cartItem.item !== item.id &&
            cartItem.washCategory !== washCategory.id
        );
      }
    },
  },
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

export const { addToCart, removeFromCart } = cartItem.actions;
export default cartItem.reducer;
