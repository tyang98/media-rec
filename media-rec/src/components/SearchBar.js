import React, { useState, useEffect } from 'react'
import './../styles/SearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

function SearchBar({ token, searchSpotify }) {
  const initialSearchTerm = () => String("" || window.localStorage.getItem('searchTerm'))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchTerm) return;
    searchSpotify(searchTerm);
    setSearchTerm("");
  }

  return (
    <Form onSubmit={handleSubmit}
      className="searchBar"
      style={{
        fontSize: 25, borderColor: 'black', borderRadius: 20
      }}>
      <input
        onChange={e => setSearchTerm(e.target.value)}
        className="input"
        placeholder="Enter Song Name"
        value={searchTerm}
      >
      </input>
      <br></br>
      <Button type="submit" className="button">Search</Button>
    </Form >

  )
}

export default SearchBar;