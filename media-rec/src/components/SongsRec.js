import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Badge, Row, Image } from 'react-bootstrap';
import SongsForm from './SongsForm.js';
import queryString from 'query-string';
import Spotify from './../utils/Spotify.js'
import SearchBar from './SearchBar.js';
import SongDisplay from './SongDisplay.js';
import Song from './Song.js';

function SongsRec() {
  // Set user data state with dummy data for now
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [user, setUser] = useState([]);


  // Set liked songs
  const [likedSongs, setLikedSongs] = useState([
    { name: "Hotel California", artists: [{ name: "The Eagles" }] },
    { name: "Nothing Else Matters", artists: [{ name: "Metallica" }] },
    { name: "More Than a Feeling", artists: [{ name: "Boston" }] }
  ]);

  // Set dummy playlists with good songs though
  const [playlists, setPlaylists] = useState([]);

  //Set selected songs with dummy data
  const [selectedSongs, setSelectedSongs] = useState([
    { name: "Stairway to Heaven", artist: [{ name: "Led Zeppelin" }] },
    { name: "Smoke On the Water", artist: [{ name: "Deep Purple" }] },
    { name: "Africa", artist: [{ name: "Toto" }] }
  ]);

  const addSong = (name, artist) => {
    const newSongs = [...selectedSongs, { name, artist }];
    setSelectedSongs(newSongs)
  };

  useEffect(() => {

    let accessToken = queryString.parse(window.location.href.slice(32)).access_token
    getUserInfo(accessToken);
    getPlaylists(accessToken);
    setSpotifyToken(accessToken);

  }, []
  );

  async function searchSpotify(terms) {
    const results = await Spotify.search(terms);
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


  const getUserInfo = (accessToken =>
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        let email = data.email;
        let name = data.display_name;
        let id = data.id;
        setUser({ email, name, id })
      })
  );

  function getPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {
        console.log(playlistData)
        const playlistArr = playlistData.items.map(data => {
          let name = data.name;
          let id = data.id;
          let playlisturl = data.external_urls.spotify;
          let image = data.images[0];
          return { name, id, playlisturl, image };
        })
        console.log(playlistArr)

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
            // console.log(tracksArr)
            let playlistsTracks = tracksArr.map(playlist =>
              playlist.map(item => {
                console.log(item)
                let name = item.track.name;
                let artists = item.track.artists;
                let id = item.track.id;
                let imageurl = item.track.album.images[0].url;
                let songurl = item.track.external_urls.spotify;
                return { name, artists, id, imageurl, songurl };
              })

            )
            // console.log(playlistsTracks)
            let index = 0;
            //Get rid of spread operator for info separate from tracks
            let fullPlaylists = playlistArr.map(info => { return { ...info, tracksList: playlistsTracks[index++] } })
            setPlaylists(fullPlaylists);
          });
      })


  }

  return (
    <Container className="mt-5">
      <h1>Hello, <b>{user.name}</b> </h1>

      {/* Display user's liked songs */}
      <Container>
        <Badge className="mt-4">Current list of liked songs</Badge>
        <ListGroup >
          {likedSongs.map((song, index) => (
            <Song
              key={index}
              song={song}
            />
          ))}
        </ListGroup>
      </Container>

      {/* Display user's playlists */}
      <ListGroup className="justify-content-md-center" horizontal>
        <Row xs={3} md={3} lg={3} >
          {playlists.map((playlist, index) => (

            <ListGroup
              className="col-md-5 mt-4"
              key={index}
              name={playlist.name}

            >
              {/* {console.log(playlist)} */}
              <Image src={playlist.image.url} style={{ width: '75%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} alt='none'></Image>

              <a href={playlist.playlisturl} target='_blank' rel='noopener noreferrer' className="badge badge-primary mt-4 mb-4">{playlist.name}</a>
              {playlist.tracksList == null ? <div></div> : playlist.tracksList.map((song, index) => (
                <Song
                  key={index}
                  song={song}
                />
              ))}
            </ListGroup>

          ))}
        </Row>
      </ListGroup>

      {/* Put search bar here */}
      <Container className='mt-5'>
        <SearchBar searchSpotify={searchSpotify} />
      </Container>
      <Container className='mt-5'>
        <SongDisplay songs={searchedSongs} addSongToPlaylist={addSongToPlaylist} />
      </Container>

      {/* Displays selected songs */}
      <Container className="mt-4">
        <SongsForm addSong={addSong} />
      </Container>
      <Badge className="mt-4">Current list of selected songs</Badge>
      <SongDisplay songs={selectedSongs} />

    </Container>
  );
}



export default SongsRec;