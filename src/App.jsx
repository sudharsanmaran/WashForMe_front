import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart, Home, LogIn, PageNotFound, Profile } from "./components";
import {
  CategoryContextProvider,
  CartContextProvider,
  AuthContextProvider,
} from "./context";
import { Provider } from "react-redux";
import { store } from "./store";

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
    <Provider store={store}>
    <AuthContextProvider>
      <CategoryContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </CategoryContextProvider>
    </AuthContextProvider>
    </Provider>
  );
}

export default App;
