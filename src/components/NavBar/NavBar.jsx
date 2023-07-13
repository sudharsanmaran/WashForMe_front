import { Link, Outlet } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <div className="container">

    <nav className="nav-bar">
      <ul >
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
}

const NavbarWrapper = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default NavbarWrapper;
