import { useNavigate } from "react-router-dom";
import WashCategories from "../WashCategories/WashCategories";
import WashableItems from "../WashableItems/WashableItems";
import NavBar from "../NavBar/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <NavBar/>
      <WashCategories />
      <WashableItems />
    </>
  );
}

export default Home;
