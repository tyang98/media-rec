import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import queryString from 'query-string';
import Spotify from './../utils/Spotify.js';
import SearchBar from './SearchBar.js';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Submit from './Submit.js';
import PlaylistDisplay from './PlaylistDisplay.js';
import SongDisplay from './SongDisplay.js';
import Song from './Song.js';

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

  function getPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {

        const playlistArr = playlistData.items.map(data => {
          let name = data.name;
          let id = data.id;
          let playlisturl = data.external_urls.spotify;
          let image = data.images[0];
          return { name, id, playlisturl, image };
        })


        let playlistTracks = playlistData.items.map(playlist => {
          let links = fetch(playlist.tracks.href, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          })
          let trackPromise = links.then(response => response.json())

          return trackPromise;
        })
        Promise.all(playlistTracks)
          .then(trackData => {
            let tracksArr = trackData.map(playlist => playlist.items)
            let playlistsTracks = tracksArr.map(playlist =>
              playlist.map(item => {

                let name = item.track.name;
                let artists = item.track.artists;
                let id = item.track.id;
                let imageurl = item.track.album.images[0].url;
                let songurl = item.track.external_urls.spotify;
                return { name, artists, id, imageurl, songurl };
              })

            )
            let index = 0;
            //Get rid of spread operator for info separate from tracks
            let fullPlaylists = playlistArr.map(info => { return { ...info, tracksList: playlistsTracks[index++] } })
            setPlaylists(fullPlaylists);
          });
      })


  }

  return (
    <Container className="">
      <h1>Hello, <b>{user.name}!!! </b> </h1>

      <h2 className="mt-4">Search Songs</h2>
      <Container className='mt-4 mx-auto'>
        <SearchBar token={spotifyToken} searchSpotify={searchSpotify} />

      </Container>
      <Container className='mt-5 mx-auto' className="overflow-auto" style={{ maxHeight: "1000px", marginTop: '3%' }}>
        <SongDisplay songs={searchedSongs} addSong={addSong} removeSong={removeSong} symbol={<AddIcon />} />
      </Container>

      <h2 className="mt-4">Current list of selected songs</h2>
      <Container className='mt-5 mx-auto'>
        <SongDisplay songs={selectedSongs} addSong={addSong} removeSong={removeSong} symbol={<RemoveIcon />} />

        {selectedSongs.length !== 0 ? <Button type="submit" onClick={getRecommended} className="button mx-auto mt-3">Submit</Button> : ""}
      </Container>

      <h2 className="mt-4">List of Recommended Songs</h2>
      <br></br>
      <Container className='mt-5 mx-auto' className="overflow-auto" style={{ maxHeight: '1500px' }}>
        <SongDisplay songs={recommendedSongs} />
      </Container>
      <br></br>
      <Container className='mt-5 mx-auto'>
        <Submit createPlaylist={createPlaylist} />
      </Container>

      <h2 className="mt-4">Your Playlists</h2>
      <Container className='mt-5'>
        {/* need to take into account to not display empty playlists*/}
        <PlaylistDisplay
          numberOfPlaylists={playlists == null ? [] : playlists.length}
          playlists={playlists == null ? [] : playlists}
          addSong={addSong}
          removeSong={removeSong}
        />
      </Container>
    </Container>

  );
}

export default SongsRec;