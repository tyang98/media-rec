import React, { useState, useEffect } from 'react'
import './../styles/SongsForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

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

  async function handleKeyPress(result) {
    if (result.key === "Enter") {
      await handleSearch();
    }
  }

  return (
    <div className="SearchBar">
      <input
        onChange={result => setSearchTerm(result.target.value)}
        placeholder="Enter A Song Title"
        onKeyPress={handleKeyPress}
        value={searchTerm} />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

export default SearchBar;