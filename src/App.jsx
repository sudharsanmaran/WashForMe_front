import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart, Home, LogIn, PageNotFound, Profile } from "./components";
import {
  CategoryContextProvider,
  CartContextProvider,
  AuthContextProvider,
} from "./context";

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
        <CategoryContextProvider>
          <CartContextProvider>
            <RouterProvider router={router} />
          </CartContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
