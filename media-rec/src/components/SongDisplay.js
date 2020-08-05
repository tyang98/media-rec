import React from 'react';
import Song from './Song.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

function SongDisplay({ songs, addSong }) {
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
                addSong={addSong}
                symbol={<AddIcon />}
              />)
          })
        }
      </ListGroup>
    </div>
  )
}

export default SongDisplay;