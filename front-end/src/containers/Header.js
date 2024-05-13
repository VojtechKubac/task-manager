import React, { useEffect } from "react";
import { createSelector } from 'reselect';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const selectUserName = state => state.auth.username;

const getUserName = createSelector(
  [selectUserName],
  (username) => ({username})
);

const Header = () => {
  const {username} = useSelector(getUserName);

  useEffect(() => {
    console.log('useEffect');
    if (username) {
      console.log('set');
      localStorage.setItem('authUser', username);
    }
  }, [username]);

  console.log('header')
  console.log(localStorage.getItem('authUser'))

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
            { localStorage.getItem('authUser') ? (
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            ) : (
               <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
            <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;