import React from 'react';
import Song from './Song.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

function SongDisplay({ songs, addSong, removeSong, symbol }) {
  return (
    <div className="SongDisplay">

      <ListGroup >
        {
          songs.map(song => {
            return (
              <Song
                key={song.id}
                song={song}
                addSong={addSong}
                removeSong={removeSong}
                symbol={symbol}
              />)
          })
        }
      </ListGroup>
    </div>
  )
}

export default SongDisplay;