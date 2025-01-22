import React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Components/Logout';
import '../Styles/page.css';
import '../Styles/navbar.css';
const NavBar = ({ user, setUser }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/product">Products</Link></li>
        <li className="navbar-item"><Link to="/productlist">Product List</Link></li>
        <li className="navbar-item"><Link to="/cart">Cart</Link></li>
        <li className="navbar-item"><Link to="/checkout">Checkout</Link></li>
        {user ? (
          <li className="navbar-item">
            <Logout setUser={setUser} />
          </li>
        ) : (
          <li className="navbar-item"><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;