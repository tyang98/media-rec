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

  static async getRecommended(selectedSongs, token) {
    const songIds = selectedSongs.map(song => song.id);

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tracks: songIds }),
    };

    try {

      const response = await fetch('http://localhost:5000/', requestOptions);
      const jsonResponse = await response.json();
      if (!jsonResponse.tracks) {
        return;
      }
      let tracksInfo = jsonResponse.tracks.map(id => {
        let url = `https://api.spotify.com/v1/tracks/${id}`
        let data = fetch(url, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        let tracks = data.then(response => response.json())
        return tracks;
      })
      let allSongs = await Promise.all(tracksInfo)
        .then(tracks => {
          let recTracks = tracks.map(track => {
            let name = track.name;
            let artists = track.artists;
            let id = track.id;
            let imageurl = track.album == null ? "none" : track.album.images[0].url;
            let songurl = track.external_urls == null ? "none" : track.external_urls.spotify;
            return { name, artists, id, imageurl, songurl };

          })
          return recTracks
        })

      return allSongs;
    } catch (err) {
      console.log(err)
    }
  }

  static async getTrackInfo(id, token) {
    let url = `https://api.spotify.com/v1/tracks/${id}`
    let data = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())

    return data
  }
}

export default Spotify;

