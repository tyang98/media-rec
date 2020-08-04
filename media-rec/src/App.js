import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsRec from './components/SongsRec.js';
import Movies from './components/Movies.js';
import { Button, Container } from 'react-bootstrap';

import {
  Route,
  HashRouter
} from 'react-router-dom';
import SearchBar from './components/SearchBar.js';





function App() {

  const handleLogIn = () => window.location = 'http://localhost:8888/login';

  const [searchedSongs, setSearchedSongs] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  useEffect(() => {
    const spotifyTokenFromUrlFragment = window.location.hash.split('&')[0].substr(14);
    setSpotifyToken(spotifyTokenFromUrlFragment);
  }, [])

  async function searchSpotify(terms) {
    const results = await Spotify.search(terms, spotifyToken);
    setSearchedSongs(results);
  }

  const addSongToPlaylist = (song) => {
    setPlaylistSongs(playlistSongs => {
      if (playlistSongs.includes(song)) {
        return playlistSongs;
      }
      else {
        return [...playlistSongs, song];
      }
    });
  }

  return (
    <div>

      <HashRouter>
        <Container className='mt-5' >
          {/* <LinkContainer to="/songsrec">
            <Button className='col-md-5' size='lg' variant='outline-primary' >Spotify log in</Button>
          </LinkContainer>
          <LinkContainer to="/movies">
            <Button className='col-md-5' size='lg' variant='outline-primary' >Movies</Button>
          </LinkContainer> */}
        </Container>
        <SearchBar></SearchBar>
        <Route path="/songsrec" component={SongsRec} />
        <Route path="/movies" component={Movies} />
      </HashRouter>
      <Container className='mt-5'>
        <Button onClick={handleLogIn} className='col-md-5' size='lg' variant='outline-primary'>Spotify Log In</Button>
      </Container>
      <Container className='mt-5'>
        <SearchBar searchSpotify={searchSpotify} />
      </Container>
      <Container className='mt-5'>
        <SongDisplay songs={searchedSongs} addSongToPlaylist={addSongToPlaylist} />
      </Container>
    </div>
  );
}

export default App;
