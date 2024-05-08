import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;