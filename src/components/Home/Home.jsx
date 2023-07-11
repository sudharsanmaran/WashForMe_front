import { useNavigate } from "react-router-dom";
import WashCategories from "../WashCategories/WashCategories";
import WashableItems from "../WashableItems/WashableItems";
import NavBar from "../NavBar/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import { fetchUserDetails } from "../../store/UserSlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }

    dispatch(fetchUserDetails());
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h3 >Home</h3>
      <WashCategories />
      <WashableItems />
    </>
  );
}

export default Home;
