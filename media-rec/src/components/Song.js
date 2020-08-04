import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';

function Song({ key, song }) {
  return <ListGroup className="list-group list-group-horizontal">
    <ListGroup.Item
      className="col-md-3 list-group-item">
      <Image src={song.imageurl} alt='none' style={{ width: '100%' }}></Image>
    </ListGroup.Item>
    <ListGroup.Item className="col-md-9 list-group-item">
      <a href={song.songurl} target='_blank' rel='noopener noreferrer'>{song.name}</a>
      {key} <br></br>
      {song.artists == null ? "None" : song.artists.map((artist, index) => artist.name + (index === song.artists.length - 1 ? "" : ", "))}
    </ListGroup.Item></ListGroup>
}

export default Song; 