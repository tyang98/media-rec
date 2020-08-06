import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';


function Song({ key, song, addSong, removeSong, symbol }) {

  const [isSelectedSong, setSelectedSong] = useState([false]);

  const handleClick = e => {
    e.preventDefault();
    if (isSelectedSong[0]) {
      removeSong(song);
      setSelectedSong([false]);
    } else {
      setSelectedSong([true]);
      addSong(song);
    }
  }


  return (
    <ListGroup className="list-group list-group-horizontal">
      <ListGroup.Item
        className="col-md-3 list-group-item"
        style={{ borderRight: "none" }}
      >
        <Image src={song.imageurl} alt="none" style={{ width: "100%" }}></Image>
      </ListGroup.Item>
      <ListGroup.Item
        className="col-md-8 list-group-item"
        style={{ borderLeft: "none", borderRight: "none" }}
      >
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
          : song.artists.map((artist, index) => (
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "black" }}
            >
              {artist.name}
              {index === song.artists.length - 1 ? "" : ", "}
            </a>
          ))}
      </ListGroup.Item>
      <ListGroup.Item
        className="col-md-1 list-group-item"
        style={{ borderLeft: "none" }}
      >
        <IconButton
          onClick={handleClick}
          style={{
            alignSelf: "flex-start",
            paddingLeft: "0px",
            paddingRight: "0px",
          }}
        >
          {symbol}
        </IconButton>
      </ListGroup.Item>
    </ListGroup>
  )
}


export default Song; 