import React from 'react';
import Song from './Song.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import RemoveIcon from '@material-ui/icons/Remove';

function Playlist({ songs, addSong, removeSong }) {
  return (
    <div className="Playlist">
      <h2>Selected Songs</h2>
      {console.log(songs)}
      <ListGroup >
        {
          songs.map(song => {
            return (
              <Song
                key={song.id}
                song={song}
                addSong={addSong}
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