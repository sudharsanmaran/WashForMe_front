// import { useEffect, useState, useContext } from "react";
// import { PrivateApi } from "../../api/axios";
// import { CategoryContext, CartContext } from "../../context";

// function WashableItems() {
//   const [items, setItems] = useState([]);
//   const { selectedCategory } = useContext(CategoryContext);
//   const { setCartItems, setTotalCount, setTotalPrice } =
//     useContext(CartContext);

//   useEffect(() => {
//   }, []);

//   const getItems = async () => {
//     try {
//       const response = await PrivateApi.get(ITEMS_URL);
//       setItems(response.data);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };

//   function addToCart(item) {
//     setCartItems((prevItems) => {
//       const updatedItems = new Map(prevItems);
    
//       if (updatedItems.has(selectedCategory.id)) {
//         updateExistingItem();
//       } else {
//         addNewItem(new Map());
//       }
    
//       return updatedItems;
    
//       function updateExistingItem() {
//         const categoryMap = updatedItems.get(selectedCategory.id);
//         if (categoryMap.has(item.id)) {
//           const currentItem = categoryMap.get(item.id);
//           currentItem.extras = { count: currentItem.extras.count + 1 };
//         } else {
//           addNewItem(categoryMap)
//         }
//       }
    
//       function addNewItem(map) {
//         item.extras = { count: 1 };
//         map.set(item.id, item);
//         updatedItems.set(selectedCategory.id, map);
//       }
//     });
//   }

//   const handleAddToCart = (item) => {
//     addToCart(item);
//     setTotalCount((prev) => prev + 1);
//     setTotalPrice(
//       (prev) =>
//         prev +
//         Number(item.price) +
//         Number(selectedCategory ? selectedCategory.extra_per_item : 0)
//     );
//   };
//   console.log(items[0]?.id, "items");
//   return (
//     <>
//       <h3>WashableItems</h3>
//       {items.length && (
//         <ul>
//           {items.map((item) => {
//             return (
//               <li key={item.id}>
//                 <div style={{ marginRight: 10, marginBottom: 5 }}>{item.name}</div>
//                 <div style={{ marginRight: 10, marginBottom: 5 }}>
//                 price:{" "}
//                 {selectedCategory
//                   ? Number(item.price) + Number(selectedCategory.extra_per_item)
//                   : item.price}
//                 </div>
//                 <div>
//                   <button onClick={() => handleAddToCart(item)}>
//                     add to cart
//                   </button>
//                 </div>
//                 <br/>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </>
//   );
// }

// export default WashableItems;




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
    dispatch(asyncAddToCart({item, selectedCategory, dispatch}));
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
