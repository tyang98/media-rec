import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/songs/SongsRec.js';
import MoviesRec from './components/movies/MoviesRec.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './App.css';
import { Container } from 'react-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';


function App() {

  const handleLogIn = () => window.location = 'http://localhost:8888/login';

  return (
    <div>
      <Header handleLogIn={handleLogIn} />
      <HashRouter>
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/moviesrec" component={MoviesRec} />
      </HashRouter>
      <Container className="mt-5">

      </Container>
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
