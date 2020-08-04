import React, { useState, useEffect } from 'react'
import './../styles/songsform.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchBar(props) {
  const initialSearchTerm = () => String(window.localStorage.getItem('searchTerm') || "")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const { search } = props;

  useEffect(() => {
    window.localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm])

  async function handleSearch() {
    try {
      await search.searchSpotify(searchTerm);
    } catch (error) {
      console.warn(error)
      const clientId = '3860186b260d438ba9e591c673f3ed0e';
      const currentUrl = window.location.href;
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${currentUrl}`;
    }
  }

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      await handleSearch();
    }
  }

  return (
    <div className="search">
      <input
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Enter A Song Title"
        onKeyPress={handleKeyPress}
        value={searchTerm} />
      <a onClick={handleSearch}>Search</a>
    </div>
  )
}

export default SearchBar;