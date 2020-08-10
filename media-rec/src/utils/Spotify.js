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
      const response = await fetch('http://localhost:5000/songs', requestOptions);
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

  static async getUserInfo(token) {
    let userInfoJson = await fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(response => response.json())
    Promise.all([userInfoJson])
    let email = userInfoJson.email;
    let name = userInfoJson.display_name;
    let id = userInfoJson.id;
    return { email, name, id }

  }

  static async getPlaylists(token) {
    let playlistData = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(response => response.json())

    const playlistArr = playlistData.items.map(data => {
      let name = data.name;
      let id = data.id;
      let playlistURL = data.external_urls.spotify;
      let image = data.images[0];
      return { name, id, playlistURL, image }
    })

    let playlistTracks = playlistData.items.map(playlist => {
      let links = Spotify.getTracks(playlist.tracks.href, token);
      return links;
    })

    let playlists = await Promise.all(playlistTracks)
      .then(trackData => {
          let tracksArr = trackData.map(playlist => playlist.items);
          let playlistTracks = tracksArr.map(playlist => 
            playlist.map(item => {
              let name = item.track.name;
              let artists = item.track.artists;
              let id = item.track.id;
              let imageurl = item.track.album.images[0].url
              let songurl = item.track.external_urls.spotify;
              return { name, artists, id, imageurl, songurl }
            })
          )
          let index = 0;
          let fullPlaylists = playlistArr.map(info => { return { ...info, tracksList: playlistTracks[index++]}})
          return fullPlaylists
        }
      )
      console.log('SPOTIFY CLASS')
      console.log(playlists)
      return playlists;
  }

  static async getTracks(url, token) {
    let links = await fetch(url, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(response => response.json())

    return links;
  }

}

export default Spotify;
