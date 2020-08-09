import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
import logo from './../images/cover.png';
import '../App.css'


function Header({ handleLogIn }) {
  return (
    <Navbar className="color-nav" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="#home">
        <Image src={logo} href="#home" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={handleLogIn}>Songs</Nav.Link>
          <Nav.Link href="/movies">Movies</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;