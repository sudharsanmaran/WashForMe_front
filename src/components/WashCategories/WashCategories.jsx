import { useEffect } from "react";
import "./WashCategories.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWashCategory,
  updateSelectedCategory,
} from "../../store/WashCategorySlice";


function WashCategories() {
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.washCategory.categories);

  const selectedCategory = useSelector(
    (state) => state.washCategory.selectedCategory
  );

  useEffect(() => {
    dispatch(fetchWashCategory());
  }, []);

  function handleCategorySelect(category) {
    dispatch(updateSelectedCategory(category));
  }

  return (
    <>
      <h3>WashCategories</h3>
      {allCategories.length && (
        <ul>
          {allCategories.map((category) => {
            const isActive = selectedCategory?.id === category.id;
            return (
              <li
                key={category.id}
              >
              <button className={isActive ? "selected" : ""}
                onClick={() => handleCategorySelect(category)}
                style={{marginTop:5}}
              >
                {category.name}, price per item: {category.extra_per_item}
              </button>
              </li>
            );
          })}
        </ul>
      )}
      <h4>
        selected categories price:
        {selectedCategory?.extra_per_item}
      </h4>
    </>
  );
}

export default WashCategories;
