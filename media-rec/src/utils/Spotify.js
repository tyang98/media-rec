const clientId = '3860186b260d438ba9e591c673f3ed0e';
let accessToken;

class Spotify {

  async retrieveAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const hasAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const hasExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (hasAccessToken && hasExpiresIn) {
      accessToken = hasAccessToken[1];
      const expiresIn = Number(hasExpiresIn[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }

  }


  async search(term) {
    const accessToken = Spotify.retrieveAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(
      response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('API request failed');
        }
      }).then(
        jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            cover: track.album.images[2].url,
            preview: track.preview_url
          }));
        });
  }
}

export default Spotify;