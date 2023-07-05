import { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const updateSelectedCategory = (newSelectedCategory) => {
    setSelectedCategory(newSelectedCategory);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        updateSelectedCategory,
        allCategories,
        setAllCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
