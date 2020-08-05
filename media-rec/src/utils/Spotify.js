const clientId = '3860186b260d438ba9e591c673f3ed0e';
const redirectUri = 'http://localhost:8888/callback';

class Spotify {
  static async search(searchTerm, token) {
    const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`
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

}

export default Spotify;
