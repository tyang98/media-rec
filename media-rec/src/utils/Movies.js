class Movies {

  static async search(term) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`
    let movies = await fetch(url)
      .then(response => response.json())
      .then(data => data.results);
    return movies;

  }

  static async getRecommendedMovies(movieIds, genres) {
    let movies = new Array();
    movieIds.map((movieId) => {
      let recommendedMovies = Movies.getRecommended(movieId)
        .then(recommendedMovies => {
          recommendedMovies.map((movie) => {
            if (genres == null || movie.genre_ids.some(genre => genres.indexOf(genre) >= 0))
              movies.push(movie);
          })
        })
    })
    return movies;
  }


  static async getRecommended(movieId) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
    let recommendedMovies = await fetch(url)
      .then(response => response.json())
      .then(data => data.results);
    return recommendedMovies
  }
}

export default Movies;