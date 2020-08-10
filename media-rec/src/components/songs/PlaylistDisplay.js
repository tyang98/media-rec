import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaylistCollapse from './PlaylistCollapse.js';
import { ListGroup, Collapse, Button } from 'react-bootstrap';


function PlaylistDisplay({ playlists, numberOfPlaylists, addSong, removeSong }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="button mx-auto"
      >
        {open ? <div>Hide Your Playlists</div> : <div>Show Your Playlists</div>}
      </Button>
      <Collapse in={open}>
        <div style={{ marginTop: '5%' }}>
          <h3>We found {numberOfPlaylists} playlists</h3>
          <br></br>
          <ListGroup className="justify-content-md-center" horizontal>
            <PlaylistCollapse
              playlists={playlists}
              addSong={addSong}
              removeSong={removeSong}
            />
          </ListGroup>
        </div>
      </Collapse>
    </>
  );
}

export default PlaylistDisplay;