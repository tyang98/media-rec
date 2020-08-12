import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Button } from 'react-bootstrap';
import MovieSearchBar from './MovieSearchBar';
import MovieDisplay from './MovieDisplay';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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

  async function getRecommended() {
    let movieIds = selectedMovies.map(movie => movie.id);
    const recommendedMovies = await Movies.getRecommended(movieIds);
    setRecommendedMovies(recommendedMovies)
  }


  return (
    <Container>
      <div className="moviesrec">
        <h1 style={{ marginTop: '10px' }} >Get started by searching for movies. </h1>
        <ListGroup
          className="list-group list-group-horizontal"
          style={{ marginTop: '2%' }}
        >
          <ListGroup.Item
            className="col-md-6 list-group-item"
          >
            <h2 className="mt-12" style={{ marginBottom: '5%' }}>Search Movies</h2>
            <MovieSearchBar searchMovie={searchMovie} />
            <Container className="mt-5 mx-auto overflow-auto" style={{ maxHeight: "1500px", marginTop: '3%' }}>
              <MovieDisplay movies={searchedMovies} addMovie={addMovie} removeMovie={removeMovie} symbol={<AddIcon />} />
            </Container>
          </ListGroup.Item>
          <ListGroup.Item
            className="col-md-6 list-group-item"
          >
            <br />
            <h2 className="mt-12">Selected Movies</h2>

            <MovieDisplay movies={selectedMovies} addMovie={addMovie} removeMovie={removeMovie} symbol={<RemoveIcon />} />
            {selectedMovies.length !== 0 ? <Button type="submit" onClick={getRecommended} className="button mx-auto mt-3">Submit</Button> : ""}
          </ListGroup.Item>

        </ ListGroup>
        <h2 className="mt-5 text-center">Recommended Movies</h2>
        <Container className='mt-5 mx-auto' className="overflow-auto" style={{ maxHeight: '1500px' }}>
          <MovieDisplay movies={recommendedMovies} />
        </Container>
        <br></br>
      </div>
    </ Container>
  );

}

export default MoviesRec;