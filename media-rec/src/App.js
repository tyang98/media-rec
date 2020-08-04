import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import { Button, Container } from 'react-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';



function App() {

  const handleLogIn = () => window.location = 'http://localhost:8888/login';


  return (
    <div>
      <HashRouter>
        <Container className='mt-5' >
        </Container>
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/movies" component={Movies} />
      </HashRouter>
      <Container className='mt-5'>
        <Button onClick={handleLogIn} className='col-md-5' size='lg' variant='outline-primary'>Spotify Log In</Button>
      </Container>
    </div>
  );
}

export default App;
