import { useEffect, useState, useContext } from "react";
import { PrivateApi } from "../../api/axios";
import { CategoryContext, CartContext } from "../../context";

function WashableItems() {
  const ITEMS_URL = "/core/api/items";
  const [items, setItems] = useState([{}]);
  const { selectedCategory } = useContext(CategoryContext);
  const { setCartItems, setTotalCount, setItemCount } = useContext(CartContext);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const response = await PrivateApi.get(ITEMS_URL);
      setItems(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  function addToCart(item) {
    setCartItems((prevItems) => {
      console.log(prevItems)
      const updatedItems = new Map(prevItems);
      updatedItems.set(item.id, item)
      console.log(updatedItems);
      return updatedItems;
    });
  }

  function upadteItemCount(item) {
    setItemCount((prevItemCount) => {
      const updatedItemCount = new Map(prevItemCount);
      const count = updatedItemCount.get(item.id) || 0;
      updatedItemCount.set(item.id, count + 1);
      return updatedItemCount;
    });
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    setTotalCount((prev) => prev + 1);
    upadteItemCount(item);
  };

  return (
    <>
      <h3>WashableItems</h3>
      <ul>
        {items.map((item) => {
          return (
            <>
              <li key={item.id}>
                <span style={{ marginRight: 10 }}>{item.name}</span>
                price:{" "}
                {selectedCategory
                  ? Number(item.price) + Number(selectedCategory.extra_per_item)
                  : item.price}
              </li>
              <button onClick={() => handleAddToCart(item)}>add to cart</button>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default WashableItems;
