import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button } from 'react-bootstrap';


function PlaylistDisplay({ playlists, numberOfPlaylists }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="button"
      >
        Show Your Playlists
      </Button>
      <Collapse in={open}>
        <div style={{ marginTop: '5%' }}>
          <h3>We found {numberOfPlaylists} playlists</h3>
          {playlists}
        </div>
      </Collapse>
    </>
  );
}

export default PlaylistDisplay;