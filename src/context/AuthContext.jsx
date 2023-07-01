import { useState, createContext, useEffect } from "react";
import Cookies from "universal-cookie";
import { api } from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const cookies = new Cookies();

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    console.log("inside AuthContextProvider useeffect", cookies.get('accessToken'), localStorage.getItem("isAuthenticated"))
  }, [])

  const updateTokens = (accessToken, refreshToken) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", true);

    cookies.set("accessToken", accessToken, { path: "/" });
    cookies.set("refreshToken", refreshToken, { path: "/" });

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    console.log('inside updateTokens', accessToken, refreshToken);
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
