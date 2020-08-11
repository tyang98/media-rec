import React, { useState, useEffect } from 'react'
import '../../styles/MovieSearchBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

function MovieSearchBar({ searchMovie }) {

  const initialSearchTerm = () => String("" || window.localStorage.getItem('searchTerm'))
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchTerm) return;
    searchMovie(searchTerm);
    setSearchTerm("");
  }

  return (
    <Form onSubmit={handleSubmit}
      className="mx-auto"
      style={{
        fontSize: 25, borderColor: 'black', borderRadius: 20
      }}>
      <input
        onChange={e => setSearchTerm(e.target.value)}
        className="input mx-auto"
        placeholder="Enter Movie Name"
        value={searchTerm}
      >
      </input>
      <br></br>
      <Button type="submit" className="searchbutton mx-auto">Search</Button>
    </Form >

  )
}

export default MovieSearchBar;