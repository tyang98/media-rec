import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import { Button, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';




function App() {
  return (
    <div>
      <HashRouter>
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
      </HashRouter>
    </div>
  );
}

export default App;
