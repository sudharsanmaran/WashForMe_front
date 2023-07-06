import { configureStore } from '@reduxjs/toolkit'
import washItemReducer from './WashItemSlice'
import  washCategoryReducer  from './WashCategorySlice'
import cartItemReducer from './CartItemSlice'
import logger from 'redux-logger'



export const store = configureStore({
  reducer: {
    washItem: washItemReducer,
    washCategory: washCategoryReducer,
    cartItem: cartItemReducer,
  },
  middleware: defaultMiddleware => {
    return defaultMiddleware().concat(logger)}
})
  