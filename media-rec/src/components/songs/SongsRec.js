import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Button } from 'react-bootstrap';
import queryString from 'query-string';
import Spotify from '../../utils/Spotify.js';
import SongSearchBar from './SongSearchBar.js';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Submit from './Submit.js';
import PlaylistDisplay from './PlaylistDisplay.js';
import SongDisplay from './SongDisplay.js';

function SongsRec() {

  const [spotifyToken, setSpotifyToken] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [user, setUser] = useState([]);

  const [playlists, setPlaylists] = useState([]);


  useEffect(() => {
    let accessToken = queryString.parse(window.location.href.slice(32)).access_token
    getUserInfo(accessToken);
    getPlaylists(accessToken);
    setSpotifyToken(accessToken);
  }, []);

  async function searchSpotify(terms) {
    const results = await Spotify.search(terms, spotifyToken);
    setSearchedSongs(results);
  }

  async function getRecommended() {
    const recSongs = await Spotify.getRecommended(selectedSongs, spotifyToken);
    setRecommendedSongs(recSongs);
  }

  async function createPlaylist(title) {
    const songIds = recommendedSongs.map(song => song.id);
    await Spotify.createPlaylist(title, songIds, spotifyToken);
    setRecommendedSongs([]);
  }

  const addSong = (song) => {
    setSelectedSongs(selectedSongs => {
      if (selectedSongs.includes(song)) {
        return selectedSongs;
      }
      else {
        return [...selectedSongs, song];
      }
    });
  }

  const removeSong = (song) => {
    setSelectedSongs(selectedSongs.filter((t) => song.name !== t.name));
  }

  async function getUserInfo(spotifyToken) {
    const userInfo = await Spotify.getUserInfo(spotifyToken);
    setUser(userInfo);
  }

  async function getPlaylists(spotifyToken) {
    const playlists = await Spotify.getPlaylists(spotifyToken);
    setPlaylists(playlists);
  }

  return (
    <Container className="">
      <br></br>
      <h1>Hello, <b>{user.name}!!! </b> <span class="wave">👋</span> </h1>
      <h2 style={{ marginTop: '10px' }} >Get started by searching for songs. </h2>
      <ListGroup
        className="list-group list-group-horizontal"
        style={{ marginTop: '3%' }}>
        <ListGroup.Item
          className="col-md-6 list-group-item"
        >
          <h2 className="mt-12" style={{ marginBottom: '5%' }}>Search Songs</h2>
          <SongSearchBar token={spotifyToken} searchSpotify={searchSpotify} />


          <Container className='mt-5 mx-auto' className="overflow-auto" style={{ maxHeight: "1000px", marginTop: '3%' }}>
            <SongDisplay songs={searchedSongs} addSong={addSong} removeSong={removeSong} symbol={<AddIcon />} />
          </Container>
        </ ListGroup.Item>
        <ListGroup.Item
          className="col-md-6 list-group-item"

        >
          <h2 className="mt-12">Selected Songs</h2>

          <SongDisplay songs={selectedSongs} addSong={addSong} removeSong={removeSong} symbol={<RemoveIcon />} />
          {selectedSongs.length !== 0 ? <Button type="submit" onClick={getRecommended} className="button mx-auto mt-3">Submit</Button> : ""}

        </ListGroup.Item>
      </ ListGroup>

      <h2 className="mt-5 text-center">Recommended Songs</h2>
      <Container className='mt-5 mx-auto' className="overflow-auto" style={{ maxHeight: '1500px' }}>
        <SongDisplay songs={recommendedSongs} />
      </Container>
      <br></br>
      <Container className='mt-5 mx-auto'>
        <Submit createPlaylist={createPlaylist} />
      </Container>

      <h2 className="mt-5 text-center">Your Playlists</h2>
      <Container className='mt-5'>
        {/* need to take into account to not display empty playlists*/}
        <PlaylistDisplay
          numberOfPlaylists={playlists == null ? [] : playlists.length}
          playlists={playlists == null ? [] : playlists}
          addSong={addSong}
          removeSong={removeSong}
        />
      </Container>
      <br></br>
    </Container>

  );
}

export default SongsRec;