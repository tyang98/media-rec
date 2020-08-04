import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';

function Song({ key, song }) {
  return <ListGroup className="list-group list-group-horizontal">
    <ListGroup.Item
      className="col-md-3 list-group-item">
      <img src={song.imageurl} alt='none' style={{ width: '100%' }}></img>
    </ListGroup.Item>
    <ListGroup.Item className="col-md-9 list-group-item">
      {key} {song.name}<br></br>
      {song.artists == null ? "None" : song.artists.map((artist, index) => artist.name + (index === song.artists.length - 1 ? "" : ", "))}
    </ListGroup.Item></ListGroup>

}


export default Song;