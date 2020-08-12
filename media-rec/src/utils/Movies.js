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
    let movies = await Movies.getMoviesList(movieIds, genres)
      .then(moviesList => {
        let emptyArr = []
        moviesList.forEach(movies => emptyArr = emptyArr.concat(movies))
        return emptyArr
      })
    return Promise.all(movies);
  }

  static async getMoviesList(movieIds, genres) {
    let movies = await movieIds.map((movieId) => {
      let movies = Movies.getRecommended(movieId)
        .then(recommendedMovies => {
          let movies = recommendedMovies.map((movie) => {
            if (genres.length == 0 || movie.genre_ids.some(genre => genres.indexOf(genre) >= 0))
              return movie;
          })
          console.log(movies)
          return movies;
        })
      return Promise.resolve(movies);
    })
    
    // console.log('MOVIES')
    // console.log(movies)
    console.log('2')
    return movies;
  }


  static async getRecommended(movieId) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
    let recommendedMovies = await fetch(url)
      .then(response => response.json())
      .then(data => data.results);
      console.log('1')
    return recommendedMovies
  }
}

export default Movies;