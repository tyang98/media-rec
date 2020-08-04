import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import SongsForm from './SongsForm.js';
import queryString from 'query-string';


function SongsRec() {
  // Set user data state with dummy data for now
  const [user, setUser] = useState([]);

  // Set liked songs
  const [likedSongs, setLikedSongs] = useState([
    { name: "Hotel California", artist: "The Eagles" },
    { name: "Nothing Else Matters", artist: "Metallica" },
    { name: "More Than a Feeling", artist: "Boston" }
  ]);

  // Set dummy playlists with good songs though
  const [playlists, setPlaylists] = useState([]);

  //Set selected songs with dummy data
  const [selectedSongs, setSelectedSongs] = useState([
    { name: "Stairway to Heaven", artist: "Led Zeppelin" },
    { name: "Smoke On the Water", artist: "Deep Purple" },
    { name: "Africa", artist: "Toto" }
  ]);

  const addSong = (name, artist) => {
    const newSongs = [...selectedSongs, { name, artist }];
    setSelectedSongs(newSongs)
  };

  useEffect(() => {

    let accessToken = queryString.parse(window.location.href.slice(32)).access_token
    getUserInfo(accessToken);
    getPlaylists(accessToken);


  }, []
  );

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
                let name = item.track.name;
                let artists = item.track.artists;
                let id = item.track.id;
                return { name, artists, id };
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
        {playlists.map((playlist, index) => (

          <ListGroup
            className="col-md-5"
            key={index}
            name={playlist.name}
          >

            <Badge className="mt-4">{playlist.name}</Badge>
            {playlist.tracksList == null ? <div></div> : playlist.tracksList.map((song, index) => (
              <Song
                key={index}
                song={song}
              />
            ))}
          </ListGroup>

        ))}
      </ListGroup>

      {/* Displays selected songs */}
      <Container className="mt-4">
        <SongsForm addSong={addSong} />
      </Container>
      <Badge className="mt-4">Current list of selected songs</Badge>
      <ListGroup >
        {selectedSongs.map((song, index) => (
          <Song
            key={index}
            song={song}
          />
        ))}
      </ListGroup>

    </Container>
  );
}

function Song({ key, song }) {
  return <ListGroup.Item>{key} {song.name}, {song.artist}</ListGroup.Item>

}

export default SongsRec;