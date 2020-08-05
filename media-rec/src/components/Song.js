import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

function Song({ key, song, handleSongAction }) {
  return (
    <ListGroup className="list-group list-group-horizontal">
      <ListGroup.Item className="col-md-3 list-group-item">
        <Image src={song.imageurl} alt="none" style={{ width: "100%" }}></Image>
      </ListGroup.Item>
      <ListGroup.Item className="col-md-9 list-group-item">
        <a
          href={song.songurl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 20 }}
        >
          {song.name}
        </a>
        <IconButton
          onClick={handleSongAction}
          aria-label="Add Song"
          style={{ alignSelf: 'flex-end' }}
        >
          <AddIcon />
        </IconButton>

        {key} <br></br>
        {song.artists == null
          ? "None"
          : song.artists.map(
            (artist, index) =>
              artist.name + (index === song.artists.length - 1 ? "" : ", ")
          )}
      </ListGroup.Item>

    </ListGroup>
  )
}

export default Song; 