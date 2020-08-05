import React from 'react';
import Song from './Song.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import RemoveIcon from '@material-ui/icons/Remove';

function Playlist({ songs, removeSong }) {
  return (
    <div className="Playlist">
      <h2>Selected Songs</h2>
      <ListGroup >
        {
          songs.map(song => {
            console.log(song)
            return (
              <Song
                key={song.id}
                song={song}
                removeSong={removeSong}
                symbol={<RemoveIcon />}
              />)
          })
        }
      </ListGroup>
    </div>
  )
}

export default Playlist