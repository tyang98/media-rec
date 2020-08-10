import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddIcon from '@material-ui/icons/Add';
import { Container, ListGroup, Collapse, Button, Image, Row } from 'react-bootstrap';
import Song from './Song.js';

function PlaylistDisplay({ playlists, numberOfPlaylists, addSong, removeSong }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="button mx-auto"
      >
        {open ? <div>Hide Your Playlists</div> : <div>Show Your Playlists</div>}
      </Button>
      <Collapse in={open}>
        <div style={{ marginTop: '5%' }}>
          <h3>We found {numberOfPlaylists} playlists</h3>
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
        </div>
      </Collapse>
    </>
  );
}

export default PlaylistDisplay;