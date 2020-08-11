import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup } from 'react-bootstrap';
import MovieSearchBar from './MovieSearchBar';
import MovieDisplay from './MovieDisplay';
import Movies from '../../utils/Movies';

function MoviesRec() {

  const [searchedMovies, setSearchedMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  function searchMovie(term) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`
    let movies = fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
        setSearchedMovies(data.results)
      })
  }

  const addMovie = (movie) => {
    setSelectedMovies(selectedMovies => {
      if (selectedMovies.includes(movie)) {
        return selectedMovies;
      }
      else {
        return [...selectedMovies, movie];
      }
    });
  }

  const removeMovie = (movie) => {
    setSelectedMovies(selectedMovies.filter((t) => movie.name !== t.name));
  }

  return (
    <div className="moviesrec">
      <ListGroup
        className="list-group list-group-horizontal"
        style={{ marginTop: '2%' }}
      >
        <ListGroup.Item
          className="col-md-6 list-group-item"
        >
          <MovieSearchBar searchMovie={searchMovie} />
          <Container className="mt-5 mx-auto overflow-auto" style={{ maxHeight: "1000px", marginTop: '3%' }}>
            <MovieDisplay movies={searchedMovies} addMovie={addMovie} removeMovie={removeMovie} />
          </Container>
        </ListGroup.Item>



      </ ListGroup>
    </div>
  );

}

export default MoviesRec;