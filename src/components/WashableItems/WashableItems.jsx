import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWashItem } from "../../store/WashItemSlice";
import { asyncAddToCart, fetchCartItems } from "../../store/CartItemSlice";
import "./WashableItems.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import stars from "./stars.png";

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
                <div className="card occupy-full">
                  <div style={{ width: "100%", height: "60%" }}>
                    <div className="oval-img-border">
                      <div className="img-container">
                        <img src={item.image} />
                      </div>
                    </div>
                    <div className="star-dsgn">
                      <img src={stars} />
                    </div>
                  </div>
                  <div className="card-info-container occupy-full">
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
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default WashableItems;
