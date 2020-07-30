import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import { Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import queryString from 'query-string';




function App() {

  const handleLogIn = () => window.location = 'http://localhost:8888/login';


  useEffect(() => {
    let token = queryString.parse(window.location.search);
    console.log(token);

  }
  );
  return (
    <div>
      {/* <HashRouter>
        <Container className='mt-5' >
          <LinkContainer to="/songsrec">
            <Button className='col-md-5' size='lg' variant='outline-primary' >Spotify log in</Button>
          </LinkContainer>
          <LinkContainer to="/movies">
            <Button className='col-md-5' size='lg' variant='outline-primary' >Movies</Button>
          </LinkContainer>
        </Container>
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/movies" component={Movies} />
      </HashRouter> */}
      <Container className='mt-5'>
        <Button onClick={handleLogIn} className='col-md-5' size='lg' variant='outline-primary'>Spotify Log In</Button>
      </Container>
    </div>
  );
}

export default App;
