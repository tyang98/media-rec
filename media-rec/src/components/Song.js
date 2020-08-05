import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function Song({ key, song, addSong, removeSong }) {

  const [isSelectedSong, setSelectedSong] = useState([false]);
  const [isRemovedSong, setRemovedSong] = useState([false]);

  const handleClick = e => {
    e.preventDefault();
    if (isSelectedSong[0]) {
      if (isRemovedSong[0]) {
        setRemovedSong([true])
        removeSong(song);
      }
      return;
    }
    setSelectedSong([true]);
    addSong(song);
  }

  return (
    <ListGroup className="list-group list-group-horizontal">
      <ListGroup.Item className="col-md-1 list-group-item justify-content-md-center">
        <IconButton
          onClick={handleClick}
          style={{ alignSelf: 'flex-start', paddingLeft: '0px', paddingRight: '0px' }}
        >
          <AddIcon />
        </IconButton>
      </ListGroup.Item>
      <ListGroup.Item className="col-md-3 list-group-item">
        <Image src={song.imageurl} alt="none" style={{ width: "100%" }}></Image>
      </ListGroup.Item>
      <ListGroup.Item className="col-md-8 list-group-item">
        <a
          href={song.songurl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 20 }}
        >
          {song.name}
        </a>


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