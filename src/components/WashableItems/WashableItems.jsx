import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWashItem } from "../../store/WashItemSlice";
import { asyncAddToCart, fetchCartItems } from "../../store/CartItemSlice";
import "./WashableItems.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function WashableItems() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.washItem.items);

  const selectedCategory = useSelector(
    (state) => state.washCategory.selectedCategory
  );

  useEffect(() => {
    dispatch(fetchWashItem());
    dispatch(fetchCartItems());
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      asyncAddToCart({ item, wash_category: selectedCategory, dispatch })
    );
  };

  return (
    <>
      <h3 className="heading">WashableItems</h3>
      {items.length && (
        <ul className="item-ul-cls">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div className="card">
                  <img src={item.image} />
                  <div className="card-info-container">
                    <div>
                      <div className="item-name">{item.name}</div>
                      <div
                        className="item-price"
                        style={{ marginRight: 10, marginBottom: 5 }}
                      >
                        ${" "}
                        {selectedCategory
                          ? Number(item.price) +
                            Number(selectedCategory.extra_per_item)
                          : item.price}
                      </div>
                    </div>

                    <div className="cart-btn-container">
                      <button
                        className="cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <AddShoppingCartIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <br />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default WashableItems;
