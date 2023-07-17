import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Cart, Home, LogIn, PageNotFound, Profile } from "./components";
import { AuthContextProvider } from "./context";
import { Provider } from "react-redux";
import { store } from "./store";
import BookTimeSlots from "./components/Booking/BookTimeSlots";
import Address from "./components/Address/Address";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
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
          path: "/bookTimeSlots",
          element: <BookTimeSlots />,
        },
        {
          path: "/address",
          element: <Address />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <div className="container">
      <Provider store={store}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </Provider>
    </div>
  );
}

export default App;
