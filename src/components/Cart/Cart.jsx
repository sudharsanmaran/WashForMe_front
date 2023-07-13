import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddToCart,
  asyncRemoveFromCart,
  fetchCartItems,
} from "../../store/CartItemSlice";
import { useNavigate } from "react-router-dom";
import empty_cart from "./empty_cart.png";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItem.cartItems);
  const totalPrice = useSelector((state) => state.cartItem.totalprice);
  const totalCount = useSelector((state) => state.cartItem.totalCount);

  const groupedCartItems = cartItems.reduce((result, obj) => {
    const category = obj.wash_category.name;
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(obj);
    return result;
  }, {});

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  const handleIcrement = ({ item, wash_category }) => {
    dispatch(asyncAddToCart({ item, wash_category, dispatch }));
  };

  const handleDecrement = (cartItem) => {
    dispatch(asyncRemoveFromCart({ cartItem, dispatch }));
  };
  return (
    <div className="container">
      {Object.keys(groupedCartItems).length ? (
        <>
          <ul className="ul-cls">
            {Object.entries(groupedCartItems).map(([categoryName, value]) => {
              return (
                <React.Fragment key={categoryName}>
                  <div>
                    <h4 className="heading">{categoryName}</h4>
                    <div className="category-item-container">
                      {value.map((cartItem) => {
                        return (
                          <li
                            key={cartItem.id}
                            style={{
                              marginTop: -15,
                              marginBottom: 25,
                              marginLeft: 20,
                            }}
                          >
                            <div className="card">
                              <img src={cartItem.item.image} />
                              <div
                                className="item-name"
                                style={{ marginRight: 10, marginBottom: 5 }}
                              >
                                {cartItem.item.name}
                              </div>
                              <div
                                className="item-price"
                                style={{ marginRight: 10, marginBottom: 5 }}
                              >
                                <button
                                  onClick={() =>
                                    handleIcrement({
                                      item: cartItem.item,
                                      wash_category: cartItem.wash_category,
                                    })
                                  }
                                  style={{ marginRight: 5, marginLeft: 5 }}
                                >
                                  {" "}
                                  +{" "}
                                </button>
                                <span
                                  style={{
                                    width: 20,
                                    marginRight: 5,
                                    marginLeft: 5,
                                  }}
                                >
                                  {cartItem.quantity}
                                </span>
                                <button
                                  style={{
                                    marginRight: 5,
                                    marginLeft: 5,
                                    marginBottom: 5,
                                    mariginTop: 10,
                                  }}
                                  onClick={() => handleDecrement(cartItem)}
                                >
                                  {" "}
                                  -{" "}
                                </button>
                                <div>price: {cartItem.price}</div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </ul>
          <h4>total price: {totalPrice}</h4>
          <h4>total count: {totalCount}</h4>
          <button onClick={() => navigate("/bookTimeslots")}>
            book time slot
          </button>
        </>
      ) : (
        <div className="no-cart-img-container">
          <img src={empty_cart} alt="My Image" />
        </div>
      )}
    </div>
  );
}

export default Cart;
