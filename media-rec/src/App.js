import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import { Button, Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';



function App() {

  const handleLogIn = () => window.location = 'http://localhost:8888/login';

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">mediaRec</Navbar.Brand>
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
      <HashRouter>
        <Container className="mt-5"></Container>
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/movies" component={Movies} />
      </HashRouter>
      <Container className="mt-5">
        <Button
          onClick={handleLogIn}
          className="col-md-5"
          size="lg"
          variant="outline-primary"
        >
          Spotify Log In
    </Button>
      </Container>
    </div>
  );
}

export default App;
