import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import queryString from 'query-string';
import Spotify from './../utils/Spotify.js';
import SearchBar from './SearchBar.js';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Submit from './Submit.js';
import PlaylistDisplay from './PlaylistDisplay.js';
import SongDisplay from './SongDisplay.js';
import Song from './Song.js';

function SongsRec() {

  const [spotifyToken, setSpotifyToken] = useState(null);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [user, setUser] = useState([]);

  const [playlists, setPlaylists] = useState([]);


  useEffect(() => {
    let accessToken = queryString.parse(window.location.href.slice(32)).access_token
    getUserInfo(accessToken);
    getPlaylists(accessToken);
    setSpotifyToken(accessToken);
  }, []);

  async function searchSpotify(terms) {
    const results = await Spotify.search(terms, spotifyToken);
    setSearchedSongs(results);
  }

  async function getRecommended() {
    const recSongs = await Spotify.getRecommended(selectedSongs, spotifyToken);
    setRecommendedSongs(recSongs);
  }

  async function createPlaylist(title) {
    const songIds = recommendedSongs.map(song => song.id);
    await Spotify.createPlaylist(title, songIds, spotifyToken);
    setRecommendedSongs([]);
  }

  const addSong = (song) => {
    setSelectedSongs(selectedSongs => {
      if (selectedSongs.includes(song)) {
        return selectedSongs;
      }
      else {
        return [...selectedSongs, song];
      }
    });
  }

  const removeSong = (song) => {
    setSelectedSongs(selectedSongs.filter((t) => song.name !== t.name));
  }

  const getUserInfo = (accessToken =>
    fetch('https://api.spotify.com/v1/me', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(data => {
        let email = data.email;
        let name = data.display_name;
        let id = data.id;
        setUser({ email, name, id })
      })
  );

  function getPlaylists(accessToken) {
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    })
      .then(response => response.json())
      .then(playlistData => {

        const playlistArr = playlistData.items.map(data => {
          let name = data.name;
          let id = data.id;
          let playlisturl = data.external_urls.spotify;
          let image = data.images[0];
          return { name, id, playlisturl, image };
        })


        let playlistTracks = playlistData.items.map(playlist => {
          let links = fetch(playlist.tracks.href, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          })
          let trackPromise = links.then(response => response.json())

          return trackPromise;
        })
        Promise.all(playlistTracks)
          .then(trackData => {
            let tracksArr = trackData.map(playlist => playlist.items)
            let playlistsTracks = tracksArr.map(playlist =>
              playlist.map(item => {

                let name = item.track.name;
                let artists = item.track.artists;
                let id = item.track.id;
                let imageurl = item.track.album.images[0].url;
                let songurl = item.track.external_urls.spotify;
                return { name, artists, id, imageurl, songurl };
              })

            )
            let index = 0;
            //Get rid of spread operator for info separate from tracks
            let fullPlaylists = playlistArr.map(info => { return { ...info, tracksList: playlistsTracks[index++] } })
            setPlaylists(fullPlaylists);
          });
      })


  }

  return (
    <Container className="">
      <h1>Hello, <b>{user.name}, </b> </h1>

      <br></br>
      <h2 className="mt-4">Search Songs</h2>
      <Container className='mt-5'>
        <SearchBar token={spotifyToken} searchSpotify={searchSpotify} />

      </Container>
      <Container className='mt-5'>
        <SongDisplay songs={searchedSongs} addSong={addSong} removeSong={removeSong} symbol={<AddIcon />} />
      </Container>

      <h2 className="mt-4">Current list of selected songs</h2>
      <Container className='mt-5'>
        <SongDisplay songs={selectedSongs} addSong={addSong} removeSong={removeSong} symbol={<RemoveIcon />} />

        <Button type="submit" onClick={getRecommended} className="button">Submit</Button>
      </Container>

      <h2 className="mt-4">List of Recommended Songs</h2>
      <br></br>
      <Container className='mt-5' className="overflow-auto" style={{ maxHeight: '1500px' }}>
        <SongDisplay songs={recommendedSongs} />
      </Container>
      <br></br>
      <Container className='mt-5'>
        <Submit createPlaylist={createPlaylist} />
      </Container>

      <Container className='mt-5'>
        {/* need to take into account to not display empty playlists*/}
        <PlaylistDisplay
          numberOfPlaylists={playlists.length}
          playlists={
            <ListGroup className="justify-content-md-center" horizontal>
              <Row xs={3} md={2} lg={2}>
                {playlists.map((playlist, index) => (
                  <ListGroup className="col-md-6 mt-4" key={index} name={playlist.name}>
                    <Image
                      src={playlist.image.url}
                      style={{
                        width: "75%",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      alt="none"
                    ></Image>

                    <a
                      href={playlist.playlisturl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="badge badge-primary mt-4 mb-4"
                    >
                      {playlist.name}
                    </a>
                    <Container className="overflow-auto" style={{ maxHeight: "1500px" }}>
                      {playlist.tracksList == null && playlist.tracksList.length !== 0 ? (
                        <div></div>
                      ) : (
                          playlist.tracksList.map((song, index) => (
                            <Song
                              key={index}
                              song={song}
                              addSong={addSong}
                              removeSong={removeSong}
                              symbol={<AddIcon />}
                            />
                          ))
                        )}
                    </Container>
                  </ListGroup>
                ))}
              </Row>
            </ListGroup>
          }
        />
      </Container>
    </Container>

  );
}

export default SongsRec;