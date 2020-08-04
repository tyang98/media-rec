import React from 'react';
import Song from './Song.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

function SongDisplay({ songs }) {
  return (
    <div className="SongDisplay">
      <h2>Songs</h2>
      <ListGroup >
        {
          songs.map(song => {
            console.log(song)
            return (
              <Song
                key={song.id}
                song={song}
              />)
          })
        }
      </ListGroup>
    </div>
  )
}

export default SongDisplay;