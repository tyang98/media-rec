import React from 'react';
import Song from './Song.js';

function SongDisplay({ songs, addSongToPlaylist }) {
  return (
    <div className="SongDisplay">
      <h2>Songs</h2>
      <div className="SongList">
        {
          songs.map(song => {
            return (
              <Song
                key={song.id}
                track={song}
                songActionCharacter="+"
                handleSongAction={addSongToPlaylist}
              />)
          })
        }
      </div>
    </div>
  )
}





export default SongDisplay;