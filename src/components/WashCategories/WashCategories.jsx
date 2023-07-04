import { useEffect, useState, useContext } from "react";
import { PrivateApi } from "../../api/axios";
import "./WashCategories.css";
import { CategoryContext } from "../../context/CategoryContext";


function WashCategories() {
  const CATEGORIES_URL = "/core/api/categories";
  const [categories, setCategories] = useState([{}]);
  const {updateSelectedCategory, selectedCategory} = useContext(CategoryContext)


  const getCategories = async () => {
    try {
      const response = await PrivateApi.get(CATEGORIES_URL);
      setCategories(response.data);
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
      <ul>
        {categories.map((category, index) => {
          const isActive = selectedCategory?.id === category.id || (index ==0 && !selectedCategory?.id)
          return <li
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={isActive ? "selected" : ""}
          >
            {category.name}, price per item: {category.extra_per_item}
          </li>
        })}
      </ul>
      <h4>
        selected categories price:{" "}
        {
          selectedCategory?.extra_per_item
        }
      </h4>
    </>
  );
}

export default WashCategories;
