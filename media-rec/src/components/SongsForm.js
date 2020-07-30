import React, { useState } from 'react';
import './../styles/songsform.css';


function SongsForm({ addSong }) {

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!title || !artist) return;
    addSong(title, artist);
    setTitle("");
    setArtist("");
  };



  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        className="input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        className="input"
        value={artist}
        onChange={e => setArtist(e.target.value)}
        placeholder="Artist"
      />
      <button className="btn" type="submit">Submit</button>
    </form>


  );

}

export default SongsForm;

