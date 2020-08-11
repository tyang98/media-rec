import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup, Image } from 'react-bootstrap';
import { IconButton } from '@material-ui/core';


function Movie({ key, movie, addMovie, removeMovie, symbol }) {

  const [isSelectedMovie, setSelectedMovie] = useState([false]);


  const handleClick = e => {
    e.preventDefault();
    if (isSelectedMovie[0]) {
      removeMovie(movie);
      setSelectedMovie([false]);
    } else {
      setSelectedMovie([true]);
      addMovie(movie);
    }
  }


  return (
    <ListGroup className="list-group list-group-horizontal">
      <ListGroup.Item
        className="col-md-7 list-group-item"
        style={{ borderRight: "none" }}
      >
        <Image src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="none" style={{ width: "100%" }}></Image>
      </ListGroup.Item>
      <ListGroup.Item
        className="col-md-4 list-group-item"
        style={{ borderLeft: "none", borderRight: "none" }}
      >
        {movie.title}
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

export default Movie