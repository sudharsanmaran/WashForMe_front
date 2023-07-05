import { useEffect, useContext } from "react";
import { PrivateApi } from "../../api/axios";
import "./WashCategories.css";
import { CategoryContext } from "../../context/CategoryContext";

function WashCategories() {
  const CATEGORIES_URL = "/core/api/categories";
  const {
    updateSelectedCategory,
    selectedCategory,
    allCategories,
    setAllCategories,
  } = useContext(CategoryContext);

  const getCategories = async () => {
    try {
      const response = await PrivateApi.get(CATEGORIES_URL);
      setAllCategories(response.data);
      // select first one initialy
      console.log('called')
      if (!selectedCategory){

        updateSelectedCategory(response.data[0]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  function handleCategorySelect(category) {
    updateSelectedCategory(category);
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
                onClick={() => handleCategorySelect(category)}
                className={isActive ? "selected" : ""}
              >
                {category.name}, price per item: {category.extra_per_item}
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
