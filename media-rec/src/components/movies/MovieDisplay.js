import React from 'react';
import Movie from './Movie.js';
import { ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDisplay({ movies, addMovie, removeMovie, symbol }) {
  return (
    <div className="MovieDisplay">
      <ListGroup>
        {
          !movies ? <div>None</div> :
            movies.map(movie =>

              <Movie
                key={movie.id}
                movie={movie}
                addMovie={addMovie}
                removeMovie={removeMovie}
                symbol={symbol}
              />
            )
        }
      </ListGroup>
    </div>
  )
}

export default MovieDisplay;