
import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cartItem.cartItems);
  const totalPrice = useSelector((state) => state.cartItem.totalprice);
  const totalCount = useSelector((state) => state.cartItem.totalCount);

  const allCategories = useSelector(state => state.washCategory.categories)

  const handleIcrement = (item) => {
    console.log(item);
  };

  const handleDecrement = (item) => {
    console.log(item);
  };

  return (
    <>
      <h3>Cart</h3>
      {cartItems && (
        <ul>
          {Array.from(cartItems).map(([categoryId, itemsMap]) => {
            return (
              <React.Fragment key={categoryId}>
                <h4>
                  {
                    allCategories.find((category) => category.id === categoryId)
                      ?.name
                  }
                </h4>
                {[...itemsMap.values()].map((item) => {
                  return (
                    <li
                      key={item.id}
                      style={{
                        marginTop: -15,
                        marginBottom: 15,
                        marginLeft: 20,
                      }}
                    >
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
                        <span
                          style={{ width: 20, marginRight: 5, marginLeft: 5 }}
                        >
                          {item.extras.count}
                        </span>
                        <button
                          style={{
                            marginRight: 5,
                            marginLeft: 5,
                            marginBottom: 5,
                            mariginTop: 10,
                          }}
                          onClick={() => handleDecrement(item)}
                        >
                          {" "}
                          -{" "}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </React.Fragment>
            );
          })}
        </ul>
      )}
      <h4>total price: {totalPrice}</h4>
      <h4>total count: {totalCount}</h4>
      <button>book time slot</button>
    </>
  );
}

export default Cart;
