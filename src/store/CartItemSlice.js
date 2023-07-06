import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PrivateApi } from "../api/axios";
import { CART_ITEMS_URL } from "../constant";
import { store } from ".";


const initialState = {
  loading: false,
  cartItems: [],
  totalprice: 0,
  totalCount: 0,
  error: "",
};

export const fetchCartItems = createAsyncThunk(
  "cartItem/fetchCartItems",
  async () => {
    return PrivateApi.get(CART_ITEMS_URL).then((response) => response.data);
  }
);


export const postaddToCart = createAsyncThunk(
  "cartItem/postaddToCart",
  async (post_data) => {
    return PrivateApi.post(CART_ITEMS_URL, post_data).then((response) => response.data);
  }
);




const cartItem = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log("global state", state.getState());
      const { item, washCategory } = action.payload;
      const price = Number(item.price) + Number(washCategory.extra_per_item);
      state.cartItems.totalCount += 1;
      state.cartItems.totalprice += price;
      const post_data = {
        item: item.id,
        washCategory: washCategory.id,
        quantity: 1,
      }

      const existingCartItem = state.cartItems.find(
        (cartItem) =>
          cartItem.washCategory === washCategory.id && cartItem.item === item.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
        existingCartItem.price += price;
      } else {
        const data = {
          ...post_data,
          price: price,
        }
        state.cartItems.push(data);
      }
      store.dispatch(postaddToCart(post_data))
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
    });

    builder.addCase(fetchCartItems.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = action.error.message;
    });
  },
});


export const { addToCart, removeFromCart } = cartItem.actions;
export default cartItem.reducer;