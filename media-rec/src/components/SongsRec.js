import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import SongsForm from './SongsForm.js';




function SongsRec() {
  // Set user data state with dummy data for now
  const [user, setUser] = useState(
    {
      username: "user1",
      name: "Henry William Yang",
    }
  );
  // Set liked songs
  const [likedSongs, setLikedSongs] = useState([
    { name: "Hotel California", artist: "The Eagles" },
    { name: "Nothing Else Matters", artist: "Metallica" },
    { name: "More Than a Feeling", artist: "Boston" }
  ]);

  // Set dummy playlists with good songs though
  const [playlists, setPlaylists] = useState([
    {
      name: "Playlist 1",
      songs: [
        { name: "Wonderwall", artist: "Oasis" },
        { name: "Let Her Go", artist: "Passenger" },
        { name: "Peace of Mind", artist: "Boston" },
        { name: "Take Me Home, Country Rods", artist: "John Denver" }
      ]
    },
    {
      name: "Playlist 2",
      songs: [
        { name: "Enter Sandman", artist: "Metallica" },
        { name: "Dream On", artist: "Aerosmith" },
        { name: "Livin' on a Prayer", artist: "Bon Jovi" }
      ]
    },
    {
      name: "Playlist 3",
      songs: [
        { name: "Highway to Hell", artist: "AC/DC" },
        { name: "I Want It That Way", artist: "Backstreet Boys" },
        { name: "Sweet Home Alabama", artist: "Lynyrd Skynyrd" },
        { name: "Californication", artist: "Red Hot Chili Peppers" }
      ]
    }
  ])
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

            {playlist.songs.map((song, index) => (
              <Song
                key={index}
                song={song}
              />
            ))}
          </ListGroup>

        ))}
      </ListGroup>

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