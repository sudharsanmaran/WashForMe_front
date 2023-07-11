import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWashItem } from "../../store/WashItemSlice";
import { asyncAddToCart, fetchCartItems } from "../../store/CartItemSlice";

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
    dispatch(asyncAddToCart({item, wash_category: selectedCategory, dispatch}));
  };

  return (
    <>
      <h3>WashableItems</h3>
      {items.length && (
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div style={{ marginRight: 10, marginBottom: 5 }}>
                  {item.name}
                </div>
                <div style={{ marginRight: 10, marginBottom: 5 }}>
                  price:{" "}
                  {selectedCategory
                    ? Number(item.price) +
                      Number(selectedCategory.extra_per_item)
                    : item.price}
                </div>
                <div>
                  <button onClick={() => handleAddToCart(item)}>
                    add to cart
                  </button>
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
