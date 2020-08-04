import React, { useState, useEffect } from 'react'
import './../styles/songsform.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

function SearchBar({ token, searchSpotify }) {
  const initialSearchTerm = () => String(window.localStorage.getItem('searchTerm') || "")
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchTerm) return;
    searchSpotify(searchTerm);
    setSearchTerm("");
  }

  return (
    <Form onSubmit={handleSubmit} className="searchBar">
      <input
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Enter Song Name"
        value={searchTerm}
      >
      </input>
      <Button type="submit">Submit</Button>
    </Form>

  )
}

export default SearchBar;