import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userDetails, setUserDetails] = useState({});

  const updateTokens = (accessToken, refreshToken) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const updateUserDetails = (userDetails) => {
    setUserDetails(userDetails);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userDetails, updateTokens, updateUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};
