import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { Cart, Home, LogIn, PageNotFound, Profile } from "./components";
import { CartContextProvider } from "./context/CartContext";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
