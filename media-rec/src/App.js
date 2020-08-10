import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './App.css';
import { Button, Container, Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
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
        <Route path="/movies" component={Movies} />
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
