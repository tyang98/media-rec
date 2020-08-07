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

  static async createPlaylist(name, songsIds, token) {
    if (Array.isArray(songsIds) && songsIds.length) {
      const createPlaylistUrl = `https://api.spotify.com/v1/me/playlists`
      const response = await fetch(createPlaylistUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          name: name,
          public: true
        })
      });
      const jsonResponse = await response.json();
      const playlistId = jsonResponse.id;
      if (playlistId) {
        const replacePlaylistTracksUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        await fetch(replacePlaylistTracksUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({ uris: songsIds.map(id => "spotify:track:".concat(id)) })
        });
      }
    }
  }

}

export default Spotify;

