import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(new Map());
  const [itemCount, setItemCount] = useState(new Map());
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        itemCount,
        setItemCount,
        totalCount,
        setTotalCount,
        totalPrice,
        setTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
