import { Link } from "react-router-dom"

function NavBar() {
  return (
    <nav>
    <ul>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
  )
}

export default NavBar