import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/songs/SongsRec.js';
import MoviesRec from './components/movies/MoviesRec.js';
import Home from './components/Home.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './App.css';
import { Container } from 'react-bootstrap';
import {
  Route,
  HashRouter
} from 'react-router-dom';

function App() {

  const handleLogIn = () => window.location = 'https://media-rec-songs.herokuapp.com/login';

  return (
    <div>
      <Header handleLogIn={handleLogIn} />
      <HashRouter>
        <Route exact path="/" component={() => <Home handleLogin={handleLogIn} />} />
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/moviesrec" component={MoviesRec} />
      </HashRouter>
      <br></br>
      <Footer />
    </div>
  );
}

export default App;
