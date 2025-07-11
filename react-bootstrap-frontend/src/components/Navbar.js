import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-3">
      <NavLink className="navbar-brand text-white" to="/">FullCRUD</NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">Items</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/users">Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/settings">Settings</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
