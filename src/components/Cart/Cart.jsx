import { useContext } from "react";

import { CartContext } from "../../context";

function Cart() {
  const { cartItems,  itemCount} = useContext(CartContext);
  console.log(itemCount)

  const handleIcrement = (item) => {
    console.log(item)

  }

  const handleDecrement = (item) => {
    console.log(item)
  }

  return (
    <>
      <h3>Cart</h3>
      <ul>
        {[...cartItems.values()]?.map((item) => {
          return (
            <>
              <li key={item.id}>{item.name}</li>
              <button onClick={()=> handleIcrement(item)}  style={{ marginRight: 5 }}> + </button>
              <input
                type="tel"
                style={{ width: 20, marginRight: 5}}
                value={itemCount.get(item.id)}
              ></input>
              <button onClick={() => handleDecrement(item)}> - </button>
            </>
          );
        })}
      </ul>
      <h4>total price: {0}</h4> 
      <button>book time slot</button>
    </>
  );
}

export default Cart;
