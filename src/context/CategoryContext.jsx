import { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState();

  const updateSelectedCategory = (newSelectedCategory) => {
    setSelectedCategory(newSelectedCategory);
  };

  return <CategoryContext.Provider value={{selectedCategory, updateSelectedCategory}}>
  {children}
  </CategoryContext.Provider>;
};
