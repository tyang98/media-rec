import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, ListGroup, Badge } from 'react-bootstrap';




function SongsRec() {
  // Set user data state with dummy data for now
  const [user, setUser] = useState([
    {
      username: "user1",
      name: "Henry William Yang",
    }
  ]);

  const [likedSongs, setLikedSongs] = useState([
    { name: "Hotel California", artist: "The Eagles" },
    { name: "Nothing Else Matters", artist: "Metallica" },
    { name: "More Than a Feeling", artist: "Boston" }
  ]);

  const [playlists, setPlaylists] = useState([
    {
      name: "Playlist 1",
      songs: [
        { name: "Wonderwall", artist: "Oasis" },
        { name: "Let Her Go", artist: "Passenger" },
        { name: "Peace of Mind", artist: "Boston" }
      ]
    },
    {
      name: "Playlist 2",
      songs: [
        { name: "Enter Sandman", artist: "Metallica" },
        { name: "Dream On", artist: "Aerosmith" },
        { name: "Livin' on a Prayer", artist: "Bon Jovi" }
      ]
    }
  ])
  //Set selected songs with dummy data
  const [selectedSongs, setSelectedSongs] = useState([
    { name: "Stairway to Heaven", artist: "Led Zeppelin" },
    { name: "Smoke On the Water", artist: "Deep Purple" },
    { name: "Africa", artist: "Toto" }
  ]);



  return (
    <Container className="mt-5">
      <Badge className="mt-4">Current list of liked songs</Badge>
      <ListGroup className="col-md-6">
        {likedSongs.map((song, index) => (
          <Song
            key={index}
            song={song}
          />
        ))}
      </ListGroup>


      <ListGroup>
        {playlists.map((playlist, index) => (
          <ListGroup className="col-md-6"
            key={index}
            name={playlist.name}>
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


      <Badge className="mt-4">Current list of selected songs</Badge>
      <ListGroup className="col-md-6">
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