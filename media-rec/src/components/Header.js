import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
import logo from './../images/cover.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import '../App.css'
import { IconButton } from '@material-ui/core';


function Header({ handleLogIn }) {
  return (
    <Navbar className="color-nav" variant="dark" expand="lg" sticky="top">
      <Navbar.Brand href="/">
        <Image src={logo} href="/" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={handleLogIn}>Songs</Nav.Link>
          <Nav.Link href="#moviesrec">Movies</Nav.Link>
        </Nav>
        <Nav.Link href="https://github.com/tyang98/media-rec/">
          <IconButton>
            <GitHubIcon
              style={{
                fontSize: '30',
                color: 'white'
              }} />
          </IconButton>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;