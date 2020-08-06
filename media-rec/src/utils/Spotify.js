class Spotify {
  static async search(searchTerm, token) {
    const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }

      });

      const jsonResponse = await response.json();
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(track => {
          let name = track.name;
          let artists = track.artists;
          let id = track.id;
          let imageurl = track.album.images == null ? "none" : track.album.images[0].url;
          let songurl = track.external_urls.spotify;
          return { name, artists, id, imageurl, songurl };
        });
      }
    }
    catch (err) {
      alert(err)
      console.log(err);
    }
  }

  static async getRecommended(selectedSongs) {
    const songIds = selectedSongs.map(song => song.id);

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tracks: songIds })
    };

    try {
      const response = await fetch('http://localhost:5000/', requestOptions);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (err) {
      alert(err)
      console.log(err);
    }
  }
}

export default Spotify;
