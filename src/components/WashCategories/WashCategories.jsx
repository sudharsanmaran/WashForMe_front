import { useEffect } from "react";
import "./WashCategories.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWashCategory,
  updateSelectedCategory,
} from "../../store/WashCategorySlice";
import { Button } from "@mui/material";

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
      <h3 className="heading">WashCategories</h3>
      {allCategories.length && (
          <ul className="ul-cls">
            {allCategories.map((category) => {
              const isActive = selectedCategory?.id === category.id;
              return (
                <li key={category.id}>
                  <button
                    className={`btn-cls ${isActive && "active"}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <span className="centered-text">{category.name}</span>
                    <span className="small-right-text">
                      $: {category.extra_per_item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
      )}
    </>
  );
}

export default WashCategories;
