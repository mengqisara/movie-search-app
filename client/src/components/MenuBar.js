import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'shards-react';

class MenuBar extends React.Component {
  render() {
    return (
      <Navbar type="dark" theme="dark" expand="md" fixed="top">
        <NavbarBrand href="/">Welcome to the CJSW Movie Database</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/movies">
              Movie Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/actors">
              Actor Search
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/popularmovie">
              Editor's Choice
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MenuBar;
