class Movies {

  static async search(term) {
    const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${term}`
    let movies = await fetch(url)
      .then(response => response.json())
      .then(data => data.results);
    return movies;

  }
}

export default Movies;