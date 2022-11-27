import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";

const NavBar = ({ user }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link className="navbar-brand" to="/">
          AmaderBazar
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/products">
              Products
            </Link>
            {user && <Link className="nav-link" to={user && `/${user.userType}`}>
              {user && "Dashboard"}
            </Link>}
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <Link className="dropdown-item" to="/products">
                Products
              </Link>

              <NavDropdown.Divider />
              <Link className="dropdown-item" to="/products">
                All Products
              </Link>
            </NavDropdown>
          </Nav>
          <Nav>
            {!user && (
              <React.Fragment>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Link className="nav-link" to="/">
                  {user.name}
                </Link>
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
