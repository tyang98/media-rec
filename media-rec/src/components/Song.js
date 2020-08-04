import React from 'react'

function Song({ track, handleSongAction, songActionCharacter }) {

  const { title, artist, album } = track
  return (
    <div className="Song">
      <div className="Song-information">
        <h3>{title}</h3>
        <p>{artist} | {album}</p>
      </div>
      <a className="Song-action"
        onClick={() => handleSongAction(track)}>
        {songActionCharacter}
      </a>
    </div>
  )

}


export default Song;