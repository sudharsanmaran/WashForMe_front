import { useContext } from "react";

import { CartContext, CategoryContext } from "../../context";

function Cart() {
  const { cartItems, totalPrice, totalCount } = useContext(CartContext);

  const { allCategories } = useContext(CategoryContext);

  console.log(cartItems, "cartItems");

  const handleIcrement = (item) => {
    console.log(item);
  };

  const handleDecrement = (item) => {
    console.log(item);
  };

  return (
    <>
      <h3>Cart</h3>
      <ul>
        {Array.from(cartItems)?.map(([categoryId, itemsMap]) => {
          return (
            <>
              <h4 key={categoryId}>
                {
                  allCategories.find((category) => category.id === categoryId)
                    ?.name
                }
              </h4>
              {[...itemsMap.values()].map((item) => {
                return (
                  <li key={item.id}>
                  <div style={{ marginRight: 10, marginBottom: 5 }}>
                    {item.name}
                  </div>
                  <div style={{ marginRight: 10, marginBottom: 5 }}>
                    <button
                      onClick={() => handleIcrement(item)}
                      style={{ marginRight: 5, marginLeft: 5 }}
                    >
                      {" "}
                      +{" "}
                    </button>
                    <span style={{ width: 20, marginRight: 5, marginLeft: 5 }}>
                      {item.extras.count}
                    </span>
                    <button
                      style={{ marginRight: 5, marginLeft: 5 }}
                      onClick={() => handleDecrement(item)}
                    >
                      {" "}
                      -{" "}
                    </button>
                  </div>
                  </li>
                );
              })}
            </>
          );
        })}
      </ul>
      <h4>total price: {totalPrice}</h4>
      <h4>total count: {totalCount}</h4>
      <button>book time slot</button>
    </>
  );
}

export default Cart;
