import { configureStore } from '@reduxjs/toolkit'
import washItemReducer from './WashItemSlice'
import  washCategoryReducer  from './WashCategorySlice'
// import cartItemReducer from './CartItemSlice'
import logger from 'redux-logger'



export const store = configureStore({
  reducer: {
    // cartItem: cartItemReducer,
    washItem: washItemReducer,
    washCategory: washCategoryReducer,
  },
  middleware: defaultMiddleware => {
    return defaultMiddleware().concat(logger)}
})
  